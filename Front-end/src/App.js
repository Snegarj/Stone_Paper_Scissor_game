
import React, { useEffect, useState } from 'react';
import Round from './Round';
import axios from 'axios'
const options = ['stone', 'paper', 'scissors'];

function App() {
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [games, setGames] = useState([]);
  const [startGame, setStartGame] = useState(false)

const fetchAlldatas=async(allRound)=>{
    await axios.put('/api/games',{...games,rounds:allRound})
      .then(response => setGames(response.data))
      .catch(error => console.error('Error fetching game data:', error));
      console.log('========reaule',games)
  }

  const handlePlay = async() => {
    // Send player names to backend to save game data
   await axios.post('/api/create', { player1, player2,rounds })
      .then(response =>setGames(response.data) )
      .catch(error => console.error('Error saving game data:', error));
    setStartGame(true)
  };
  //Game started
  const playRound = async(player1Choice, player2Choice) => {
    const winner = determineWinner(player1Choice, player2Choice);
    let allRound=[...rounds, { round: currentRound, player1Choice, player2Choice, winner }]
      await   fetchAlldatas(allRound)
   setRounds([...rounds, { round: currentRound, player1Choice, player2Choice, winner }]);
 if(currentRound < 6){
  setCurrentRound(currentRound + 1);
 }
    
  };

  const determineWinner = (player1Choice, player2Choice) => {
    if (player1Choice === player2Choice) return 'tie';
    if (
      (player1Choice === 'stone' && player2Choice === 'scissors') ||
      (player1Choice === 'scissors' && player2Choice === 'paper') ||
      (player1Choice === 'paper' && player2Choice === 'stone')
    ) {
      return 'Player 1';
    } else {
      return 'Player 2';
    }
  };

  return (
    <div>
      <h1>Stone Paper Scissors</h1>
      
      {!startGame ?  <div className='player-name'>
        <input type="text" placeholder="Enter Player1 Name" value={player1} onChange={e => setPlayer1(e.target.value)} />
        <input type="text"  placeholder="Enter Player2 Name" value={player2} onChange={e => setPlayer2(e.target.value)} />
        <button className='play-button' onClick={()=>handlePlay()}>Start Game</button>
      </div>
      
      :<>
        <h2>Round {currentRound}</h2>
        <Round game={games} options={options} playRound={playRound} currentRound={currentRound} />
        <h2>Scoreboard</h2>
        <ul>
    {games?.rounds?.length > 0 ?  <>     {games?.rounds?.map((round, index) => (
            <li key={index}>
              Round {round.round}: {round.player1Choice} vs {round.player2Choice} - Winner: {round.winner}
            </li>
          ))}</>:
          <>
          {rounds?.map((round, index) => (
            <li key={index}>
              Round {round.round}: {round.player1Choice} vs {round.player2Choice} - Winner: {round.winner}
            </li>
          ))}</>
          }
        </ul>
      </>
      }
    </div>
  );
}

export default App;

