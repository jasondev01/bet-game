import { useState } from 'react';
import './App.css';

const getRandomNumbers = () => {
    let numbers = [];
    while (numbers.length < 4) {
        let rand = Math.floor(Math.random() * 25);
        if (!numbers.includes(rand)) {
            numbers.push(rand);
        }
    }
    return numbers;
}

const multiplier = [
    1.13,
    1.35,
    1.54,
    2,
    2.48,
    3.1,
    3.92,
    5.04,
    6.6,
    8.8,
    16.8,
    24.27,
    36.41,
    57.22,
    95.37,
    171.67,
    343.35,
    801.16,
    2400,
    12020
]

function App() {

    const [clicks, setClicks] = useState([]);
    const [mines, setMines] = useState(getRandomNumbers());

    const [bet, setBet] = useState(10);
    const [isActive, setIsActive] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const [credits, setCredits] = useState(500);
    const [win, setWin] = useState(0);

    const [btnClicked, setBtnClicked] = useState(false);

    return (
        <div className="App">
            <div className='container'>
                <div className='boxes'>
                    {
                        Array(25)
                        .fill(0)
                        .map((value, index) => {

                            const clicked = clicks.includes(index);
                            const isBomb = mines.includes(index);

                            return (
                                <div 
                                onClick={() => {
                                    if (!isActive) return;

                                    if (!clicked) {
                                        setClicks([...clicks, index]);
                                        setWin(bet * multiplier[clicks.length]);
                                    }

                                    if (isBomb) {
                                        setWin(0);
                                        setIsGameOver(true)
                                        setIsActive(false)
                                    }

                                }}
                                className={`box ${clicked || isGameOver ? 'removebg' : ''}`}
                                    
                                >  
                                    <p>
                                        {
                                            clicked || isGameOver ? (isBomb ? '💣' : '🟡' ) : '?'
                                        }
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='credits__win'>
                <p>CREDITS: {credits.toFixed(2)} </p>
                <p>{isGameOver ? 'Game Over' : 'WIN'}: {win.toFixed(2)}</p>
            </div>

            <div className='betting'>
                    <div className='betting__func'>
                        <input type="number" className='bet__value'
                            value={bet}
                            onChange={e => {
                                setBet(e.target.value)
                            }}
                            disabled={isActive}
                        />
                        <button className={`btn ${btnClicked ? (!isGameOver ? 'claim' : '' ) : '' }`}
                            onClick={() => {
                                if (isActive) {
                                    setCredits(credits + win);
                                    setWin(0);
                                    setIsActive(false);
                                    setBtnClicked(false)
                                } else {
                                    if (credits < bet) return;
                                    setCredits(credits - bet)
                                    setWin(+bet);
                                    setIsActive(true);
                                    setIsGameOver(false);
                                    setClicks([]);
                                    setMines(getRandomNumbers());
                                    if (!isGameOver) {
                                        setBtnClicked(true)
                                    }
                                }
                            }}
                        > 
                            {isActive ? 'CLAIM' : 'BET'}
                        </button>
                    </div>
                </div>
        </div>
    );
}

export default App;