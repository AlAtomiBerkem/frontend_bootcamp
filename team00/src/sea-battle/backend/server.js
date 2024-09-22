const express = require("express");
const {
  signUp,
  signIn,
  logout,
  getAllUsers,
  getUserByLogin,
} = require("./controllers/auth");
const {
  addUserToRoom,
  createRoom,
  getRooms,
  deleteRoom,
} = require("./controllers/room");
const {
  createGame,
  deleteGame,
  getGame,
  updateGame,
} = require("./controllers/game");
const { sequelize } = require("./models");
const { Room, Game } = require("./models");
const ws = require("ws");
const cors = require("cors");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/signup", signUp);
app.post("/api/signin", signIn);
app.post("/api/logout", logout);
app.get("/api/users", getAllUsers);
app.get("/api/users/login/:login", getUserByLogin);
app.put("/api/addUserToRoom", addUserToRoom);
app.post("/api/createRoom", createRoom);
app.get("/api/rooms", getRooms);
app.delete("/api/rooms", deleteRoom);
app.post("/api/game", createGame);
app.delete("/api/game", deleteGame);
app.post("/api/game/id", getGame);
app.put("/api/game", updateGame);

const server = http.createServer(app);

const webSocketServer = new ws.Server({ server });
webSocketServer.on("connection", (ws) => {
  console.log(
    `New client connected. Total clients: ${webSocketServer.clients.size}`
  );

  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    console.log("Received message:", data);
    switch (data.type) {
      case "create_room":
        try {
          const room = await Room.create({
            room_id: data.room_id,
            name: data.name,
            player1: data.creator,
            status: "waiting",
          });
          console.log("Room created:", room);
          broadcast({
            type: "room_created",
            room,
          });
        } catch (error) {
          console.error("Error creating room:", error);
          ws.send(
            JSON.stringify({ type: "error", message: "Error creating room" })
          );
        }
        break;

      case "join_room":
        try {
          const room = await Room.findOne({ where: { room_id: data.room_id } });
          if (!room) {
            return ws.send(
              JSON.stringify({ type: "error", message: "Room not found" })
            );
          }
          room.player2 = data.player2;
          room.status = "playing";
          await room.save();
          console.log("Player joined room:", room);

          broadcast({
            type: "room_ready",
            room,
          });
        } catch (error) {
          console.error("Error joining room:", error);
          ws.send(
            JSON.stringify({ type: "error", message: "Error joining room" })
          );
        }
        break;

      case "get_rooms":
        try {
          const rooms = await Room.findAll();
          ws.send(
            JSON.stringify({
              type: "all_rooms",
              rooms,
            })
          );
        } catch (error) {
          console.error("Error fetching rooms:", error);
          ws.send(
            JSON.stringify({ type: "error", message: "Error fetching rooms" })
          );
        }
        break;

      case "delete_room":
        try {
          const room = await Room.findOne({ where: { room_id: data.room_id } });
          if (!room) {
            return ws.send(
              JSON.stringify({ type: "error", message: "Room not found" })
            );
          }
          await room.destroy();

          broadcast({
            type: "room_deleted",
            room_id: data.room_id,
          });
        } catch (error) {
          console.error("Error deleting room:", error);
          ws.send(
            JSON.stringify({ type: "error", message: "Error deleting room" })
          );
        }
        break;
      case "create_game":
        try {
          const existingGame = await Game.findOne({
            where: {
              player1_login: data.player1_login,
              player2_login: data.player2_login,
              status: "waiting",
            },
          });

          if (existingGame) {
            console.log("Game already exists, sending back existing game");
            ws.send(
              JSON.stringify({
                type: "game_created",
                game: existingGame,
              })
            );
            return;
          }
          const newGame = await Game.create({
            player1_login: data.player1_login,
            player2_login: data.player2_login,
            player1_ships: data.player1_ships || {},
            player2_ships: data.player2_ships || {},
            current_turn:
              Math.random() < 0.5 ? data.player1_login : data.player2_login,
            status: "waiting",
            moves_history: [],
          });
          console.log("Game created with ID:", newGame.id);
          broadcast({
            type: "game_created",
            game: newGame,
          });
        } catch (error) {
          console.error("Error creating game:", error);
          ws.send(
            JSON.stringify({ type: "error", message: "Error creating game" })
          );
        }
        break;
      case "delete_game":
        try {
          const game = await Game.findOne({
            where: { id: data.game_id },
          });
          if (!game) {
            return ws.send(
              JSON.stringify({ type: "error", message: "Game not found" })
            );
          }
          await game.destroy();

          broadcast({
            type: "game_deleted",
            game_id: data.game_id,
          });
        } catch (error) {
          console.error("Error deleting game:", error);
          ws.send(
            JSON.stringify({ type: "error", message: "Error deleting game" })
          );
        }
        break;
      case "get_game":
        try {
          const game = await Game.findOne({ where: { id: data.game_id } });
          if (!game) {
            return ws.send(
              JSON.stringify({ type: "error", message: "Game not found" })
            );
          }
          ws.send(JSON.stringify({ type: "game_data", game }));
        } catch (error) {
          console.error("Error fetching game data:", error);
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Error fetching game data",
            })
          );
        }
        break;
      case "update_game":
        try {
          const game = await Game.findOne({ where: { id: data.game_id } });

          if (!game) {
            return ws.send(
              JSON.stringify({ type: "error", message: "Game not found" })
            );
          }

          // Обновляем поля игры
          const updatedGameData = {
            ...game.dataValues, // Берем все текущие значения полей игры
            ...data.updateFields, // Обновляем только переданные поля
          };

          await game.update(updatedGameData);

          // Проверяем готовность игроков и устанавливаем статус игры в "in_progress"
          if (updatedGameData.player1_ready && updatedGameData.player2_ready) {
            await game.update({ status: "in_progress" });
            updatedGameData.status = "in_progress";
          }

          // Отправляем обновленные данные всем клиентам
          broadcast({ type: "game_updated", game: updatedGameData });
        } catch (error) {
          console.error("Error updating game:", error);
          ws.send(
            JSON.stringify({ type: "error", message: "Error updating game" })
          );
        }
        break;

      default:
        console.log("Unknown message type:", data.type);
        ws.send(
          JSON.stringify({ type: "error", message: "Unknown message type" })
        );
        break;
    }
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

function broadcast(data) {
  webSocketServer.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    server.listen(PORT, () => {
      console.log(
        `HTTP and WebSocket server is running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
