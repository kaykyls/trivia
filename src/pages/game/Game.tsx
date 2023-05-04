import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './game.scss'
import Question from '../../components/question/Question';
import { updateQuestion } from '../../redux/questionsSlice';

const Game = () => {
    const questions = useSelector((state: any) => state.questions.questions)
    const currentQuestion = useSelector((state: any) => state.questions.currentQuestion)
    const dispatch = useDispatch()

    console.log(questions)

    const handleUpdateQuestion = () => {
        dispatch(updateQuestion())
    }

    return (
        <div className='game-container'>
            <div className='game-wrapper'>
                <div>
                    <div className='quiz-info'>
                        <h1>Quiz</h1>
                        <span className='question-number'>{currentQuestion + 1}/10</span>
                    </div>
                    <span className='question-text'>{questions[currentQuestion].question}</span>
                </div>
                
                <Question answers={[questions[currentQuestion].correct_answer, ...questions[currentQuestion].incorrect_answers]}/>
                <button className='next-btn' onClick={handleUpdateQuestion}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Game