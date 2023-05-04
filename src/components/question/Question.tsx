import React, { useState } from 'react'
import './question.scss'

const Question = (props: any) => {
    const handleSelectAnswer = (index: number) => {
        props.setSelectedAnswer(index)
    }

    return (
        <div className='question'>
            <div className="alternatives">
                <div onClick={() => handleSelectAnswer(0)} className={props.selectedAnswer === 0 ? "alternative is-selected" : "alternative"}>
                    <span className='alternative-text'>{"A)"} {props.answers[0]}</span>
                </div>
                <div onClick={() => handleSelectAnswer(1)} className={props.selectedAnswer === 1 ? "alternative is-selected" : "alternative"}>
                    <span className='alternative-text'>{"B)"} {props.answers[1]}</span>
                </div>
                <div onClick={() => handleSelectAnswer(2)} className={props.selectedAnswer === 2 ? "alternative is-selected" : "alternative"}>
                    <span className='alternative-text'>{"C)"} {props.answers[2]}</span>
                </div>
                <div onClick={() => handleSelectAnswer(3)} className={props.selectedAnswer === 3 ? "alternative is-selected" : "alternative"}>
                    <span className='alternative-text'>{"D)"} {props.answers[3]}</span>
                </div>
            </div>
        </div>
    )
}

export default Question