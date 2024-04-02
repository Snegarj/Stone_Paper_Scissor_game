// Round.js
import React, { useEffect, useState } from 'react';
import stoneImage from './images/stone.png';
import paperImage from './images/paper.png';
import scissorsImage from './images/scissor.png';

function Round({ options, playRound, currentRound,game }) {
    const [player1Choice, setPlayer1Choice] = useState('');
    const [player2Choice, setPlayer2Choice] = useState('');
    const [error, setError] = useState(false);

    const handleChoice = (player, choice) => {
        if (player === 1) {
            setPlayer1Choice(choice);
        } else {
            setPlayer2Choice(choice);
        }

    };
    useEffect(() => {
        if (player2Choice && player1Choice) {
            setError(false);
        }
        else {
            setError(true);
        }
    }, [player1Choice, player2Choice])

    const handlePlay = () => {
        playRound(player1Choice, player2Choice);
        
    };

    return (
        <div className="round-container">
            <div className="player-container">
                <div className="player-section">
                    <h3>{game?.player1 || 'Player1'}</h3>
                    <div>
                        {options.map(option => (
                            <button
                                key={option}
                                onClick={() => handleChoice(1, option)}
                                className={player1Choice === option ? 'selected' : ''}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {player1Choice && <img src={getImage(player1Choice)} alt={player1Choice} className="option-image" />}
                </div>
                <div className="player-section">
                <h3>{game?.player2|| 'Player2' }</h3>
                    <div>
                        {options.map(option => (
                            <button
                                key={option}
                                onClick={() => handleChoice(2, option)}
                                className={player2Choice === option ? 'selected' : ''}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {player2Choice && <img src={getImage(player2Choice)} alt={player2Choice} className="option-image" />}
                </div>
            </div>
         
            {currentRound <= 6 &&
                <div className='play-round'>
                    <button disabled={error} className="play-button" onClick={handlePlay}>Play Round</button>
                </div>}
        </div>
    );
}

function getImage(option) {
    switch (option) {
        case 'stone':
            return stoneImage;
        case 'paper':
            return paperImage;
        case 'scissors':
            return scissorsImage;
        default:
            return '';
    }
}

export default Round;
