import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedAnswers,
} from '../../redux/answersSlice';
import './question.scss';
import he from 'he';

interface QuestionProps {
  question: {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  };
  answers: string[];
}

const Question = ({ question, answers }: QuestionProps) => {
  const dispatch = useDispatch();
  const [decodedAnswers, setDecodedAnswers] = useState<string[]>([]);
  const currentQuestion = useSelector((state: any) => state.questions.currentQuestion);
  const {
    selectedAnswers,
    isCorrect,
    correctAnswers
  } = useSelector((state: any) => state.answer);

  const handleSelectAnswer = (index: number) => {
    if (isCorrect[currentQuestion] !== undefined) {
      return;
    }

    dispatch(setSelectedAnswers({ index: currentQuestion, answer: index }));
  };

  useEffect(() => {
    const decodedAnswers = answers.map((answer: string) => he.decode(answer));
    setDecodedAnswers(decodedAnswers);
  }, [answers]);

  const changeClassName = (index: number) => {
    if (isCorrect[currentQuestion] === false && selectedAnswers[currentQuestion] === index) {
      return 'alternative is-wrong';
    }

    if (isCorrect[currentQuestion] && selectedAnswers[currentQuestion] === index) {
      return 'alternative is-correct';
    }

    if (isCorrect[currentQuestion] === false && index === correctAnswers[currentQuestion]) {
      return 'alternative is-correct';
    }


    if (selectedAnswers[currentQuestion] === index) {
      return 'alternative is-selected';
    }

    if (isCorrect[currentQuestion] !== undefined && answers[index] !== correctAnswers[currentQuestion] && selectedAnswers[currentQuestion] !== index) {
      return 'alternative is-confirmed';
    }
    
    return 'alternative';
  };

  return (
    <div className='question'>
      <div className="alternatives">
        <div onClick={() => handleSelectAnswer(0)} className={changeClassName(0)}>
          <span className='alternative-text'>{"A)"} {decodedAnswers[0]}</span>
        </div>
        <div onClick={() => handleSelectAnswer(1)} className={changeClassName(1)}>
          <span className='alternative-text'>{"B)"} {decodedAnswers[1]}</span>
        </div>
        {question.type === "multiple" &&
          <Fragment>
            <div onClick={() => handleSelectAnswer(2)} className={changeClassName(2)}>
              <span className='alternative-text'>{"C)"} {decodedAnswers[2]}</span>
            </div>
            <div onClick={() => handleSelectAnswer(3)} className={changeClassName(3)}>
              <span className='alternative-text'>{"D)"} {decodedAnswers[3]}</span>
            </div>
          </Fragment>
        }
      </div>
    </div>
  );
};

export default Question;