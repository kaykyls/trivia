import React from 'react'
import { useSelector } from 'react-redux';
import './game.scss'

const Game = () => {
    const questions = useSelector((state: any) => state.questions.questions)

    console.log(questions)

    return (
        <div className='game-container'>
            <div className='game-wrapper'>
                <h1>Game</h1>
            </div>
        </div>
    )
}

export default Game