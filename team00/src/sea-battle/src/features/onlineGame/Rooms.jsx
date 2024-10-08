import classes from "./onlineGame.module.scss";
import React from "react";
import CustomMui from "../../components/CustomMui";
import Modal from "@mui/material/Modal";
import { useGame } from "../../contexts/gameContext";

const Rooms = () => {
  const {
    rooms,
    open,
    setOpen,
    name,
    setName,
    handleCreateRoom,
    handleConnectToRoom,
  } = useGame();

  return (
    <div className={classes.container}>
      <h1>Rooms: </h1>
      <div className={classes.content}>
        <div className={classes.rooms}>
          {rooms
            .filter((room) => room.status === "waiting")
            .map((room, i) => (
              <div className={classes.room} key={i}>
                <div>
                  <h2>{room.name}</h2>
                  <p>
                    <span>Creator:</span> {room.player1}
                  </p>
                </div>
                <CustomMui
                  text="Connect"
                  variant="button"
                  buttonType="button"
                  onClick={() => handleConnectToRoom(room.room_id)}
                />
              </div>
            ))}
        </div>
        <div className={classes.button}>
          <CustomMui
            text="Create room"
            buttonType="button"
            variant="button"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <div className={classes.modal}>
          <CustomMui
            type="text"
            text="Name"
            variant="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomMui
            buttonType="button"
            variant="button"
            onClick={handleCreateRoom}
            text="Create Room"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Rooms;
