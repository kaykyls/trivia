import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetQuestions, setQuestions } from '../../redux/questionsSlice';
import './home.scss'
import { categories } from '../../utils/categories';
import ErrorModal from '../../components/errorModal/ErrorModal';
import Loader from '../../components/loader/Loader';
import { resetScore } from '../../redux/scoreSlice';
import { resetAnswer } from '../../redux/answersSlice';
import { setAnswers } from '../../redux/answersSlice';
import { setCorrectAnswers } from '../../redux/answersSlice';
import { useSelector } from 'react-redux';


interface Category {
  id: number;
  name: string;
}

const Home: React.FC = () => {
    const [valueInput, setValueInput] = useState<number>(10)
    const [categoryId, setCategoryId] = useState<number>(0)
    const [difficulty, setDifficulty] = useState<string>("easy")
    const [type, setType] = useState<string>("multiple")
    const [error, setError] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false)

    const correctAnswers = useSelector((state: any) => state.answer.correctAnswers)

    const values = []

    for (let i = 0; i < 50; i ++) {
        values.push(i + 1)
    }

    const navigate = useNavigate()

    const dispatch = useDispatch()

    async function getQuestions(url: string) {
        let res = await fetch(url)
        let data = await res.json()
        return data
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const resetGame = () => {
        setCategoryId(0)
        setDifficulty("easy")
        setType("multiple")
        setValueInput(10)

        dispatch(setQuestions([]))
        dispatch(resetScore())
        dispatch(resetAnswer())
        dispatch(resetQuestions())
    }

    const shuffle = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const handlePlay = async () => {
        resetGame()

        setLoader(true)
        let url = `https://opentdb.com/api.php?amount=${valueInput}`

        if(categoryId !== 0) {
            url += `&category=${categoryId}`
        }

        url += `&difficulty=${difficulty}`
        url += `&type=${type}`

        const data = await getQuestions(url)

        if (data.response_code === 1) {
            setLoader(false)
            setError(true)
            return
        }

        dispatch(setQuestions(data.results))

        let checkAnswers: any[] = []
        data.results.forEach((question: any) => {
            checkAnswers = [...checkAnswers, shuffle([...question.incorrect_answers, question.correct_answer])]
        })

        for(let i = 0; i < checkAnswers.length; i++) {
            for(let j = 0; j < checkAnswers[i].length; j++) {
                if(checkAnswers[i][j] === data.results[i].correct_answer) {
                    dispatch(setCorrectAnswers({index: i, correctAnswer: j}))
                }
            }
        }

        dispatch(setAnswers([...checkAnswers]))
        setLoader(false)


        navigate('/game')
    }

    console.log(correctAnswers)


  return (
    <div className="menu-container">
        <div className="menu-wrapper">
        <h1>Trivia</h1>
            <form onSubmit={handleSubmit} className="menu-options">
                <label htmlFor="categories">Category</label>
                <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} name="categories" id="categories">
                    {categories.map((category: Category, index: number) => <option key={index} value={category["id"]}>{category["name"]}</option>)}
                </select>

                <label htmlFor="difficulty">Difficulty</label>
                <select value={difficulty} onChange={(e) =>setDifficulty(e.target.value)} name="difficulty" id="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label htmlFor="type">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} name="type" id="type">
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>

                <label htmlFor="amount">Amount</label>
                <select  onChange={(e) => setValueInput(Number(e.target.value))} value={valueInput} name="" id="">
                    {values.map((value: number, index: number) => <option key={index} value={value}>{value}</option>)}
                </select>

                <button onClick={handlePlay} className='play-btn'>Play</button>
            </form>
        </div>
        {loader && <Loader/>}
        {error && <ErrorModal setError={setError}/>}
    </div>
  )
}

export default Home
