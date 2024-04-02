// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Game } = require('./Model');
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const MongoDB_Uri=process.env.MONGO_URI;
const cors=require('cors')
app.use(cors())
// Connect to MongoDB
mongoose.connect(MongoDB_Uri)
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Middleware for parsing JSON body
app.use(express.json());

// Endpoint for saving game data
app.post('/api/create', async (req, res) => {
  try {
    const { player1, player2, rounds } = req.body;
    const game = new Game({ player1, player2, rounds });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    console.error('Error saving game data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for retrieving all game data
app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    console.error('Error retrieving game data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/games',async (req, res) => {
  const { _id } = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).json({ error: "Game Not Found" });
  }
  try {    
      let game = await Game.findByIdAndUpdate(
          {_id:_id} ,
          {...req.body}
          )
          res.status(200).json(game)
  }
  catch {
      err => {
          res.status(400).json({message:err})
      }
  }
})