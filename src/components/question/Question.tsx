import React from 'react'
import './question.scss'

const Question = (props: any) => {
    const shuffle = (array: []) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const answers = [...shuffle(props.answers)]

    return (
        <div className='question'>
            <div className="alternatives">
                <div className="alternative">
                    <span className='alternative-text'>{"A)"} {answers[0]}</span>
                </div>
                <div className="alternative">
                    <span className='alternative-text'>{"B)"} {answers[1]}</span>
                </div>
                <div className="alternative">
                    <span className='alternative-text'>{"C)"} {answers[2]}</span>
                </div>
                <div className="alternative">
                    <span className='alternative-text'>{"D)"} {answers[3]}</span>
                </div>
            </div>
        </div>
    )
}

export default Question