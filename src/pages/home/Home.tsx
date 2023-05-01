import React, { useState } from 'react'
import './home.scss'

interface Category {
  id: number;
  name: string;
}

const Home: React.FC = () => {
    console.log("Home")

    const [categories, setCategories] = useState<Category[]>([])
    const [valueInput, setValueInput] = useState<number>(10)

    async function getCategories() {
        let res = await fetch("https://opentdb.com/api_category.php")
        let data = await res.json()
        return data
    }

    getCategories().then(data => setCategories(data.trivia_categories))

  return (
    <div className="menu-container">
        <div className="menu-wrapper">
        <h1>Trivia</h1>
            <form className="menu-options">
                <label htmlFor="categories">Category</label>
                <select name="categories" id="categories">
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

                <button className='play-btn'>Play</button>
            </form>
        </div>   
    </div>
  )
}

export default Home
