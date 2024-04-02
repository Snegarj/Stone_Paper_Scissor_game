
const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    player1: String,
    player2: String,
    rounds: [{
      round: Number,
      player1Choice: String,
      player2Choice: String,
      winner: String
    }]
,
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  // Create model for game data
 const Game = mongoose.model('game', gameSchema);
 module.exports={Game}