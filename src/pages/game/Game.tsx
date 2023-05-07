import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './game.scss'
import Question from '../../components/question/Question';
import { updateQuestion } from '../../redux/questionsSlice';
import { increment } from '../../redux/scoreSlice';
import { setIsCorrect } from '../../redux/answerSlice';
import he from 'he';

const Game = () => {
    const questions = useSelector((state: any) => state.questions.questions)
    const currentQuestion = useSelector((state: any) => state.questions.currentQuestion)
    const playerAnswer = useSelector((state: any) => state.answer.playerAnswer)
    const score = useSelector((state: any) => state.score.value)
    const selectedAnswer = useSelector((state: any) => state.answer.selectedAnswer)
    const isCorrect = useSelector((state: any) => state.answer.isCorrect)

    const dispatch = useDispatch()

    const handleUpdateQuestion = () => {    
        if (currentQuestion === 9) {
            return
        }
        dispatch(updateQuestion())
    }

    const handleCheckAnswer = () => {
        if (playerAnswer === null) {
            return
        }

        if(questions[currentQuestion].correct_answer === playerAnswer) {
            dispatch(setIsCorrect(true))
            dispatch(increment(10))
        } else {
            dispatch(setIsCorrect(false))
        }
    }

    return (
        <div className='game-container'>
            <div className='game-wrapper'>
                <div className='game-info'>
                    <div className="score">
                        <span className="difficulty-text">
                            Difficulty: {questions[currentQuestion].difficulty}
                        </span>
                        <span className='score-text'>Score: {score}</span>
                    </div>
                    <div className='quiz-info'>
                        {/* botar categoria no lugar de quiz */}
                        <h1>{questions[currentQuestion].category}</h1>
                        <span className='question-number'>{currentQuestion + 1}/10</span>
                    </div>
                    <span className='question-text'>{he.decode(questions[currentQuestion].question)}</span>
                </div>

                <Question isCorrect={isCorrect} question={questions[currentQuestion]}/>

                <button className={selectedAnswer !== null ? 'next-btn' : "next-btn not-selected"} onClick={isCorrect === null ? handleCheckAnswer : handleUpdateQuestion}>
                    {isCorrect !== null ? "Next" : "Confirm"}
                </button>  
            </div>
        </div>
    )
}

export default Game