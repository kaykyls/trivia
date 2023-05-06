import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuestions } from '../../redux/questionsSlice';
import './home.scss'

interface Category {
  id: number;
  name: string;
}

const Home: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [valueInput, setValueInput] = useState<number>(10)
    const [categoryId, setCategoryId] = useState<number>(0)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    async function getCategories() {
        let res = await fetch("https://opentdb.com/api_category.php")
        let data = await res.json()
        return data
    }

    async function getQuestions() {
        let res = await fetch(`https://opentdb.com/api.php?amount=${valueInput}`)
        let data = await res.json()
        return data.results
    }

    useEffect(() => {
        getCategories().then(data => setCategories(data.trivia_categories))
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handlePlay = async () => {
        const data = await getQuestions()

        dispatch(setQuestions(data))

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
                <select name="difficulty" id="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label htmlFor="type">Type</label>
                <select name="type" id="type">
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>

                <label htmlFor="amount">Amount</label>
                <input onChange={(e) => setValueInput(Number(e.target.value))} type="number" name="amount" id="amount" min="1" max="50" value={valueInput}/>

                <button onClick={handlePlay} className='play-btn'>Play</button>
            </form>
        </div>   
    </div>
  )
}

export default Home
