import classes from "./game.module.scss";
import SvgSelector from "../../components/SvgSelector";
import React, { useEffect, useState } from "react";
import Field from "../../components/field/Field";
import FieldOfOpponent from "../../components/field/FieldOfOpponent";
import clsx from "clsx";
import { useGame } from "../../contexts/gameContext";
import CustomTooltip from "../../components/CustomTooltip";
import CustomMui from "../../components/CustomMui";
import Countdown from "../../components/Countdown";
import CustomModal from "../../components/CustomModal";
import { useNavigate } from "react-router-dom";

const Game = ({ roomId }) => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const {
    placedShips,
    setPlacedShips,
    enemy,
    saveGameToLocalStorage,
    handleDeleteGame,
    currentGame,
    handleDeleteRoom,
    updateGameViaWebSocket,
    startAnimation,
    setStartAnimation,
  } = useGame();

  const [ships, setShips] = useState([
    { id: "ship4", size: 4, count: 1 },
    { id: "ship3", size: 3, count: 2 },
    { id: "ship2", size: 2, count: 3 },
    { id: "ship1", size: 1, count: 4 },
  ]);

  const [selectedShip, setSelectedShip] = useState(null);
  const [hoveredCell, setHoveredCell] = useState([]);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [exit, setExit] = useState(false);
  const [isValidPlacement, setIsValidPlacement] = useState(true);
  const [ready, setReady] = useState(false);
  const [firstTurn, setFirstTurn] = useState(0);
  const [enemyIsReady, setEnemyIsReady] = useState(null);

  const authUser = JSON.parse(localStorage.getItem("user"));
  // const totalShips = ships.reduce((sum, ship) => sum + ship.count, 0);
  const totalShips = 0;
  const currentGameId = localStorage.getItem("currentGameId");

  const navigate = useNavigate();

  const handleExitGame = () => {
    handleDeleteGame(currentGameId);
    handleDeleteRoom(roomId);
    setExit(false);
    navigate("/rooms");
  };
  const handleReadyClick = () => {
    setReady(true);
    setFirstTurn(currentGame.current_turn === authUser.login ? 2 : 1);
    handleReady();
    saveGameToLocalStorage();
  };
  const handleShipClick = (ship) => {
    ship.count > 0 && setSelectedShip(ship);
  };

  const handleCellMouseEnter = (row, col) => {
    let validPlacement = true;
    if (selectedShip) {
      const size = selectedShip.size;
      const hoveredCells = [];
      for (let i = 0; i < size; i++) {
        let currentCell;
        if (isHorizontal) {
          if (col + i <= 10) {
            currentCell = { row, col: col + i };
          } else {
            setHoveredCell([]);
            return;
          }
        } else {
          if (rows.indexOf(row) + i <= 9) {
            currentCell = { row: rows[rows.indexOf(row) + i], col };
          } else {
            setHoveredCell([]);
            return;
          }
        }
        if (isCellNearAnotherShip(currentCell)) {
          validPlacement = false;
        }
        hoveredCells.push(currentCell);
      }
      if (validPlacement) {
        setHoveredCell(hoveredCells);
        setIsValidPlacement(true);
      } else {
        setHoveredCell(
          hoveredCells.map((cell) => ({ ...cell, invalid: true }))
        );
        setIsValidPlacement(false);
      }
    }
  };

  const handleWheelClick = (e) => {
    if (e.button === 1) {
      setIsHorizontal(!isHorizontal);
    }
  };
  const handleCellMouseLeave = () => {
    setHoveredCell([]);
  };

  const handlePlaceShip = () => {
    if (selectedShip && hoveredCell.length > 0 && isValidPlacement) {
      const direction = isHorizontal ? "horizontal" : "vertical";
      const cellsWithShipId = hoveredCell.map((cell) => ({
        ...cell,
        shipId: selectedShip.id,
        direction,
      }));
      setPlacedShips((prev) => [...prev, ...cellsWithShipId]);
      setHoveredCell([]);
      setSelectedShip(null);
      setShips((prevShips) =>
        prevShips.map((ship) =>
          ship.id === selectedShip.id
            ? { ...ship, count: ship.count - 1 }
            : ship
        )
      );
    }
  };
  const isCellNearAnotherShip = (cell) => {
    const surroundingCells = getSurroundingCells(cell);
    return surroundingCells.some((surroundingCell) =>
      placedShips.some(
        (placedShip) =>
          placedShip.row === surroundingCell.row &&
          placedShip.col === surroundingCell.col
      )
    );
  };
  const getSurroundingCells = (cell) => {
    const surroundingCells = [];
    const rowIndex = rows.indexOf(cell.row);
    const col = cell.col;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          rowIndex + i >= 0 &&
          rowIndex + i < 10 &&
          col + j >= 1 &&
          col + j <= 10
        ) {
          surroundingCells.push({ row: rows[rowIndex + i], col: col + j });
        }
      }
    }
    return surroundingCells;
  };

  const handleReplaceShip = (shipId, row, col) => {
    const clickedCell = placedShips.find(
      (cell) => cell.row === row && cell.col === col && cell.shipId === shipId
    );
    if (!clickedCell) return;
    const isHorizontal = clickedCell.direction === "horizontal";
    const shipToReplaceCells = [];
    if (isHorizontal) {
      for (let i = col; i <= 10; i++) {
        const cell = placedShips.find(
          (c) => c.row === row && c.col === i && c.shipId === shipId
        );
        if (cell) {
          shipToReplaceCells.push(cell);
        } else {
          break;
        }
      }
    } else {
      const rowIndex = rows.indexOf(row);
      for (let i = rowIndex; i < rows.length; i++) {
        const cell = placedShips.find(
          (c) => c.row === rows[i] && c.col === col && c.shipId === shipId
        );
        if (cell) {
          shipToReplaceCells.push(cell);
        } else {
          break;
        }
      }
    }
    if (shipToReplaceCells.length > 0) {
      const shipToReplace = ships.find((ship) => ship.id === shipId);
      if (!shipToReplace) return;
      setShips((prevShips) =>
        prevShips.map((ship) =>
          ship.id === shipId ? { ...ship, count: ship.count + 1 } : ship
        )
      );
      setPlacedShips((prevPlacedShips) =>
        prevPlacedShips.filter(
          (cell) =>
            !shipToReplaceCells.some(
              (replaceCell) =>
                replaceCell.row === cell.row && replaceCell.col === cell.col
            )
        )
      );
      setSelectedShip(shipToReplace);
    }
  };

  const handleReady = () => {
    const updatedGameData =
      currentGame.player1_login === authUser.login
        ? { player1_ready: true }
        : { player2_ready: true };
    updateGameViaWebSocket(currentGameId, updatedGameData);
  };

  const handleCancel = () => {
    setReady(false);
    const updatedGameData =
      currentGame.player1_login === authUser.login
        ? { player1_ready: false }
        : { player2_ready: false };
    updateGameViaWebSocket(currentGameId, updatedGameData);
  };
  useEffect(() => {
    if (currentGame) {
      const enemyReady =
        (currentGame.player1_login !== authUser.login &&
          currentGame.player1_ready) ||
        (currentGame.player2_login !== authUser.login &&
          currentGame.player2_ready);
      setEnemyIsReady(enemyReady);
    }
  }, [currentGame]);
  useEffect(() => {
    const savedPlacedShips = localStorage.getItem("placedShips");
    if (savedPlacedShips) {
      setPlacedShips(JSON.parse(savedPlacedShips));
    }
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes["main-container"]}>
          <Field
            hoveredCell={hoveredCell}
            onCellMouseEnter={handleCellMouseEnter}
            onCellMouseLeave={handleCellMouseLeave}
            handleWheelClick={handleWheelClick}
            placedShips={placedShips}
            onPlaceShip={handlePlaceShip}
            onReplaceShip={handleReplaceShip}
            ships={ships}
          />
          <div className={classes.ships}>
            <div>
              {ships.slice(0, 2).map((ship) => (
                <div
                  key={ship.id}
                  className={clsx(
                    classes["ship-container"],
                    selectedShip &&
                      ship.id === selectedShip.id &&
                      classes.selected
                  )}
                  onClick={() => handleShipClick(ship)}
                >
                  <SvgSelector id={ship.id} />
                  <p>
                    {ship.size}x cage: <span>{ship.count}</span>
                  </p>
                </div>
              ))}
            </div>
            <div>
              {ships.slice(2, 4).map((ship) => (
                <div
                  key={ship.id}
                  className={clsx(
                    classes["ship-container"],
                    selectedShip &&
                      ship.id === selectedShip.id &&
                      classes.selected
                  )}
                  onClick={() => handleShipClick(ship)}
                >
                  <SvgSelector id={ship.id} />
                  <p>
                    {ship.size}x cage: <span>{ship.count}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {currentGame && currentGame.status === "waiting" && (
          <div className={classes.buttons}>
            {totalShips > 0 ? (
              <CustomTooltip title="Arrange all the ship" placement="top">
                <span>
                  <button disabled={totalShips > 0}>Ready</button>
                </span>
              </CustomTooltip>
            ) : (
              <span>
                <button
                  disabled={totalShips > 0 || ready}
                  onClick={handleReadyClick}
                >
                  Ready
                </button>
              </span>
            )}
            <p className={clsx(enemyIsReady ? "" : classes.disabled)}>
              {enemyIsReady && enemy
                ? `${enemy.name} is ready`
                : `${enemy && enemy.name} not ready`}
            </p>
          </div>
        )}
        <div className={classes["main-container"]}>
          <FieldOfOpponent />
        </div>
        {ready && currentGame && currentGame.status === "waiting" && (
          <CustomModal
            open={ready}
            onClose={() => setReady(false)}
            children={
              <div className={classes.modal}>
                <h3>
                  Waiting for <span>{enemy.name}</span>
                </h3>
                <SvgSelector id="loader" />
                <CustomMui
                  buttonType="button"
                  variant="button"
                  onClick={handleCancel}
                  text="Cancel"
                />
              </div>
            }
          />
        )}
        {exit && (
          <CustomModal
            open={exit}
            onClose={() => setExit(false)}
            children={
              <div className={classes.modal}>
                <h2>This game will be over.</h2>
                <p>Are you sure?</p>
                <CustomMui
                  buttonType="button"
                  variant="button"
                  onClick={handleExitGame}
                  text="Yes"
                />
              </div>
            }
          />
        )}
        {startAnimation && (
          <Countdown
            open={startAnimation}
            setOpen={setStartAnimation}
            firstTurn={firstTurn}
          />
        )}
      </div>
      <button className={classes.exit} onClick={() => setExit(true)}>
        Exit
      </button>
    </div>
  );
};

export default Game;
