import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getUserByLogin } from "../api/api";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const authUser = JSON.parse(localStorage.getItem("user"));
  const [placedShips, setPlacedShips] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [socket, setSocket] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [opponentLeft, setOpponentLeft] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("WebSocket connection established");
      ws.send(JSON.stringify({ type: "get_rooms" }));
      const gameId = localStorage.getItem("currentGameId");
      const currentEnemy = JSON.parse(localStorage.getItem("enemy"));
      currentEnemy && setEnemy(currentEnemy);
      gameId && getGameViaWebSocket(gameId, ws, setCurrentGame);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "all_rooms") {
        setRooms(data.rooms);
      } else if (data.type === "room_created") {
        setRooms((prevRooms) => [...prevRooms, data.room]);
      } else if (data.type === "room_ready") {
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.room_id === data.room.room_id ? data.room : room
          )
        );
      } else if (data.type === "room_deleted") {
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room.room_id !== data.room_id)
        );
      } else if (data.type === "game_created") {
        console.log("Game created:", data.game);
        setCurrentGame(data.game);
        localStorage.setItem("currentGameId", data.game.id);

        const enemy =
          data.game.player1_login === authUser.login
            ? data.game.player2_login
            : data.game.player1_login;
        fetchUser(enemy).then(() => {
          console.log("Enemy data fetched and saved to localStorage");
        });
      } else if (data.type === "game_deleted") {
        console.log("Game deleted");
        const currentId = localStorage.getItem("currentGameId");
        if (currentId === data.game_id) {
          setOpponentLeft(true);
        }
        localStorage.removeItem("currentGameId");
        localStorage.removeItem("placedShips");
        localStorage.removeItem("enemy");
        setPlacedShips([]);
        setEnemy(null);
        setCurrentGame(null);
      } else if (data.type === "game_data") {
        console.log("Game restored:", data.game);
        setCurrentGame(data.game);
      } else if (data.type === "game_updated") {
        console.log("Game updated:", data.game);
        if (data.game.status === "in_progress") setStartAnimation(true);
        setCurrentGame(data.game);
      }
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  const handleCreateRoom = () => {
    const roomId = uuidv4();
    const newRoom = {
      room_id: roomId,
      name: name,
      creator: authUser.login,
      status: "waiting",
    };
    const createRoomMessage = JSON.stringify({
      type: "create_room",
      ...newRoom,
    });
    socket.send(createRoomMessage);
    setOpen(false);
    setName("");
    navigate(`/rooms/${roomId}`);
  };

  const handleConnectToRoom = (roomId) => {
    const joinRoomMessage = JSON.stringify({
      type: "join_room",
      room_id: roomId,
      player2: authUser.login,
    });
    socket.send(joinRoomMessage);
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.room_id === roomId
          ? { ...room, status: "playing", player2: authUser.login }
          : room
      )
    );
    navigate(`/rooms/${roomId}`);
  };
  const handleDeleteRoom = (roomId) => {
    const joinRoomMessage = JSON.stringify({
      type: "delete_room",
      room_id: roomId,
    });
    socket.send(joinRoomMessage);
  };
  const handleCreateGame = (player1, player2) => {
    const createGameMessage = JSON.stringify({
      type: "create_game",
      player1_login: player1,
      player2_login: player2,
      player1_ships: placedShips,
      player2_ships: {},
    });
    socket.send(createGameMessage);
  };
  const handleDeleteGame = (gameId) => {
    const deleteGameMessage = JSON.stringify({
      type: "delete_game",
      game_id: gameId,
    });
    socket.send(deleteGameMessage);
  };
  const getGameViaWebSocket = (gameId, socket) => {
    if (!gameId) {
      throw new Error("Game ID not found");
    }
    if (!socket) {
      throw new Error("WebSocket connection is not established");
    }
    const request = {
      type: "get_game",
      game_id: gameId,
    };
    socket.send(JSON.stringify(request));
  };
  const fetchUser = async (login) => {
    try {
      const data = await getUserByLogin(login);
      localStorage.setItem("enemy", JSON.stringify(data));
      setEnemy(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
  const updateGameViaWebSocket = (gameId, updateFields) => {
    if (!gameId) {
      throw new Error("Game ID not found");
    }
    if (!socket) {
      throw new Error("WebSocket connection is not established");
    }

    const request = {
      type: "update_game",
      game_id: gameId,
      updateFields,
    };

    socket.send(JSON.stringify(request));
  };
  const saveGameToLocalStorage = () => {
    localStorage.setItem("placedShips", JSON.stringify(placedShips));
  };

  return (
    <GameContext.Provider
      value={{
        rooms,
        setRooms,
        open,
        setOpen,
        name,
        setName,
        handleCreateRoom,
        handleConnectToRoom,
        handleDeleteRoom,
        setSocket,
        placedShips,
        setPlacedShips,
        enemy,
        saveGameToLocalStorage,
        handleCreateGame,
        handleDeleteGame,
        currentGame,
        getGameViaWebSocket,
        opponentLeft,
        updateGameViaWebSocket,
        setStartAnimation,
        startAnimation,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
