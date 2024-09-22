const { Game } = require("../models");

const createGame = async (req, res) => {
  const { player1_login, player2_login, player1_ships, player2_ships } =
    req.body;
  const randomTurn = Math.random() < 0.5 ? player1_login : player2_login;

  try {
    const newGame = await Game.create({
      player1_login,
      player2_login,
      player1_ready: false,
      player2_ready: false,
      player1_ships: player1_ships || {},
      player2_ships: player2_ships || {},
      current_turn: randomTurn,
      status: "waiting",
      moves_history: [],
    });
    return res.status(201).json(newGame);
  } catch (error) {
    console.error("Ошибка при создании игры:", error);
    return res.status(500).json({ error: "Не удалось создать игру" });
  }
};
const deleteGame = async (req, res) => {
  const { game_id } = req.body;
  try {
    const game = await Game.findOne({ where: { id: game_id } });
    if (!game) {
      return res.status(404).json({ error: "Игра не найдена" });
    }
    await game.destroy();
    return res.status(200).json({ message: "Игра успешно удалена" });
  } catch (error) {
    console.error("Ошибка при удалении игры:", error);
    return res.status(500).json({ error: "Не удалось удалить игру" });
  }
};
const getGame = async (req, res) => {
  const { game_id } = req.body;
  try {
    const game = await Game.findOne({ where: { id: game_id } });
    if (!game) {
      return res.status(404).json({ error: "Игра не найдена" });
    }
    return res.status(200).json({ game });
  } catch (error) {
    console.error("Ошибка при получении игры:", error);
    return res.status(500).json({ error: "Не удалось получить игру" });
  }
};

const updateGame = async (req, res) => {
  const { game_id, updateFields } = req.body;

  try {
    const game = await Game.findOne({ where: { id: game_id } });
    if (!game) {
      return res.status(404).json({ error: "Игра не найдена" });
    }

    // Обновляем поля, если они присутствуют в updateFields
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] !== undefined) {
        game[key] = updateFields[key];
      }
    });

    // Если оба игрока готовы, обновляем статус игры на "in_progress"
    if (game.player1_ready && game.player2_ready) {
      game.status = "in_progress";
    }

    await game.save();
    return res.status(200).json({ message: "Игра обновлена", game });
  } catch (error) {
    console.error("Ошибка при обновлении игры:", error);
    return res.status(500).json({ error: "Не удалось обновить игру" });
  }
};

module.exports = {
  createGame,
  deleteGame,
  getGame,
  updateGame,
};
