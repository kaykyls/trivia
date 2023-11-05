import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './game.scss'
import Question from '../../components/question/Question';
import { updateQuestion } from '../../redux/questionsSlice';
import { increment } from '../../redux/scoreSlice';
import { setIsCorrect } from '../../redux/answersSlice';
import { useNavigate } from 'react-router-dom';
import he from 'he';
const Game: React.FC = () => {
    const questions = useSelector((state: any) => state.questions.questions)
    const currentQuestion = useSelector((state: any) => state.questions.currentQuestion)
    const score = useSelector((state: any) => state.score.value)
    const selectedAnswers = useSelector((state: any) => state.answer.selectedAnswers)
    const isCorrect = useSelector((state: any) => state.answer.isCorrect)
    const correctAnswers = useSelector((state: any) => state.answer.correctAnswers)
    const answers = useSelector((state: any) => state.answer.answers)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdateQuestion = () => {    
        if (currentQuestion === questions.length - 1) {
            navigate('/result')
        }

        dispatch(updateQuestion(1))
    }

    const handleCheckAnswer = () => {
        console.log(selectedAnswers[currentQuestion])

        if(selectedAnswers[currentQuestion] === undefined) {
            return
        }

        if(selectedAnswers[currentQuestion] === correctAnswers[currentQuestion]) {
            dispatch(setIsCorrect({index: currentQuestion, isCorrect: true}))
            dispatch(increment(10))
        } else {
            dispatch(setIsCorrect({index: currentQuestion, isCorrect: false}))
        }
    }

    const handleNavigateQuestions = (direction: string) => () => {
        if(direction === "left") {
            if(currentQuestion === 0) {
                return
            }
            dispatch(updateQuestion(-1))
        } else {
            if(currentQuestion === questions.length - 1) {
                return
            }
            dispatch(updateQuestion(1))
        }
    }

    return (
        <div className='game-container'>
            <div className='game-wrapper'>
                <div className='game-info'>
                    <div className="navigation-buttons">
                        <button onClick={handleNavigateQuestions("left")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="arrow">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <button onClick={handleNavigateQuestions("right")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="arrow">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div> 
                    <div className='quiz-info'>
                        <h1>{questions[currentQuestion]?.category}</h1>
                        <span className='question-number'>{currentQuestion + 1}/{questions.length}</span>
                    </div>
                    <span className='question-text'>{questions.length > 0 ? he.decode(questions[currentQuestion]?.question ): null}</span>
                </div>

                <Question question={questions[currentQuestion]} answers={answers[currentQuestion]}/>
                
                <button className={selectedAnswers[currentQuestion] !== undefined ? 'next-btn' : "next-btn not-selected"} onClick={isCorrect[currentQuestion] === undefined ? handleCheckAnswer : handleUpdateQuestion}>
                    {isCorrect[currentQuestion] !== undefined && currentQuestion === questions.length - 1 ? "Finish" : null}
                    {isCorrect[currentQuestion] !== undefined && currentQuestion !== questions.length - 1 ? "Next" : null}
                    {isCorrect[currentQuestion] === undefined ? "Confirm" : null}
                </button>
            </div>
        </div>
    )
}

export default Game