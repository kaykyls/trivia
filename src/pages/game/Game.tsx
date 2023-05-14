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
    // const isPlaying = useSelector((state: any) => state.game.isPlaying)
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
                        <button onClick={handleNavigateQuestions("left")}><span className="material-symbols-outlined">arrow_back</span></button>
                        <button onClick={handleNavigateQuestions("right")}><span className="material-symbols-outlined">arrow_forward</span></button>
                    </div>
                    {/* <div className="score">
                        <span className="difficulty-text">Difficulty: {questions[currentQuestion]?.difficulty}</span>
                        <span className='score-text'>Score: {score}</span>
                    </div> */}
                    
                    <div className='quiz-info'>
                        <h1>{questions[currentQuestion]?.category}</h1>
                        <span className='question-number'>{currentQuestion + 1}/{questions.length}</span>
                    </div>
                    <span className='question-text'>{questions.length > 0 ? he.decode(questions[currentQuestion]?.question ): null}</span>
                </div>

                <Question question={questions[currentQuestion]} answers={answers[currentQuestion]}/>
                
                <button className={selectedAnswers[currentQuestion] !== undefined ? 'next-btn' : "next-btn not-selected"} onClick={isCorrect[currentQuestion] === undefined ? handleCheckAnswer : handleUpdateQuestion}>
                    {isCorrect[currentQuestion] !== undefined ? "Next" : "Confirm"}
                </button>
            </div>
        </div>
    )
}

export default Game