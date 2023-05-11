import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './result.scss'

const Result = () => {
    const score = useSelector((state: any) => state.score.value)
    const questions = useSelector((state: any) => state.questions.questions)

    const navigate = useNavigate()

    const handlePlayAgain = () => {


        navigate('/')
    }

    return (
        <div className='result-container'>
            <div className='result-wrapper'>
                <div className='result-info'>
                    <h1>Result</h1>
                    <span className='result-text'>Your score is: {`${score}/${questions.length * 10}`}</span>
                </div> 
                <button className='play-again-btn' onClick={handlePlayAgain}>
                    Play Again
                </button>
            </div>
        </div>
    )
}

export default Result