import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './game.scss'
import Question from '../../components/question/Question';
import { updateQuestion } from '../../redux/questionsSlice';

const Game = () => {
    const questions = useSelector((state: any) => state.questions.questions)
    const currentQuestion = useSelector((state: any) => state.questions.currentQuestion)
    const dispatch = useDispatch()

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [answers, setAnswers] = useState<string[]>([])

    const shuffle = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        setAnswers(shuffle([questions[currentQuestion].correct_answer, ...questions[currentQuestion].incorrect_answers]))
    }, [])

    console.log(questions)

    const handleUpdateQuestion = () => {
        dispatch(updateQuestion())
    }

    return (
        <div className='game-container'>
            <div className='game-wrapper'>
                <div>
                    <div className='quiz-info'>
                        {/* botar categoria no lugar de quiz */}
                        <h1>Quiz</h1>
                        <span className='question-number'>{currentQuestion + 1}/10</span>
                    </div>
                    <span className='question-text'>{questions[currentQuestion].question}</span>
                </div>
                
                <Question answers={answers} setSelectedAnswer={setSelectedAnswer} selectedAnswer={selectedAnswer}/>
                <button className='next-btn' onClick={handleUpdateQuestion}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Game