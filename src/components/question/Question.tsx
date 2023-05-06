import React, { useEffect, useState } from 'react'
import './question.scss'
import { useSelector } from 'react-redux';


const Question = (props: any) => {
    const [answers, setAnswers] = useState<string[]>([])

    const handleSelectAnswer = (index: number) => {
        props.setSelectedAnswer(index)

        props.setPlayerAnswer(answers[index])
    }

    const shuffle = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        setAnswers(shuffle([props.question.correct_answer, ...props.question.incorrect_answers]))  
    }, [props.question])

    const changleClassName = (index: number) => {
        let name = "alternative"

        if (props.selectedAnswer === index) {
            name += " is-selected"
        }

        console.log(props.isCorrect)

        if(props.isCorrect !== null && props.question.correct_answer === answers[index]) {
            name += " is-correct"
        } else if(props.isCorrect === false && props.selectedAnswer === index) {
            name += " is-wrong"
        }

        return name
    }

    return (
        <div className='question'>
            <div className="alternatives">
                <div onClick={() => handleSelectAnswer(0)} className={changleClassName(0)}>
                    <span className='alternative-text'>{"A)"} {answers[0]}</span>
                </div>
                <div onClick={() => handleSelectAnswer(1)} className={changleClassName(1)}>
                    <span className='alternative-text'>{"B)"} {answers[1]}</span>
                </div>
                <div onClick={() => handleSelectAnswer(2)} className={changleClassName(2)}>
                    <span className='alternative-text'>{"C)"} {answers[2]}</span>
                </div>
                <div onClick={() => handleSelectAnswer(3)} className={changleClassName(3)}>
                    <span className='alternative-text'>{"D)"} {answers[3]}</span>
                </div>
            </div>
        </div>
    )
}

export default Question