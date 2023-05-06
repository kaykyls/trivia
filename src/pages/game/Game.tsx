import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './game.scss'
import Question from '../../components/question/Question';
import { updateQuestion } from '../../redux/questionsSlice';
import { increment } from '../../redux/scoreSlice';

const Game = () => {
    const questions = useSelector((state: any) => state.questions.questions)
    const currentQuestion = useSelector((state: any) => state.questions.currentQuestion)
    const dispatch = useDispatch()

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [playerAnswer, setPlayerAnswer] = useState<string>("")
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const score = useSelector((state: any) => state.score.value)
    
    console.log(questions)

    const handleUpdateQuestion = () => {
        handleCheckAnswer()

        // setIsCorrect(null)

        // dispatch(updateQuestion())
    }

    const handleCheckAnswer = () => {
        if (selectedAnswer === null) {
            return
        }

        setSelectedAnswer(null)

        if(questions[currentQuestion].correct_answer === playerAnswer) {
            setIsCorrect(true)

            dispatch(increment(10))
        } else {
            setIsCorrect(false)
        }
    }

    return (
        <div className='game-container'>
            <div className='game-wrapper'>
                <div>
                    <div className="score">
                        <span className='score-text'>Score: {score}</span>
                    </div>
                    <div className='quiz-info'>
                        {/* botar categoria no lugar de quiz */}
                        <h1>Quiz</h1>
                        <span className='question-number'>{currentQuestion + 1}/10</span>
                    </div>
                    <span className='question-text'>{questions[currentQuestion].question}</span>
                </div>
                
                <Question isCorrect={isCorrect} setPlayerAnswer={setPlayerAnswer} question={questions[currentQuestion]} setSelectedAnswer={setSelectedAnswer} selectedAnswer={selectedAnswer}/>
                <button className='next-btn' onClick={handleUpdateQuestion}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Game