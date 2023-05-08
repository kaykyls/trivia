import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuestions, updateCategoryId } from '../../redux/questionsSlice';
import './home.scss'
import { categories } from '../../utils/categories';
import ErrorModal from '../../components/errorModal/ErrorModal';
import Loader from '../../components/loader/Loader';

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

    const handlePlay = async () => {
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
        dispatch(updateCategoryId(categoryId))
        setLoader(false)

        navigate('/game')
    }

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
                <input onChange={(e) => setValueInput(Number(e.target.value))} type="number" name="amount" id="amount" min="1" max="50" value={valueInput}/>

                <button onClick={handlePlay} className='play-btn'>Play</button>
            </form>
        </div>
        {loader && <Loader/>}
        {error && <ErrorModal setError={setError}/>}
    </div>
  )
}

export default Home
