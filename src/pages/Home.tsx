import React from 'react'
import { useState } from 'react'

const Home = () => {
    console.log("Home")

    const [categories, setCategories] = useState([])
    const [valueInput, setValueInput] = useState<number>(10)

    async function getCategories() {
        let res = await fetch("https://opentdb.com/api_category.php")
        let data = await res.json()
        return data
    }

    getCategories().then(data => setCategories(data.trivia_categories))

  return (
    <div className="menu">
            <h1>Trivia</h1>
            <form className="menu-options">
                <label htmlFor="categories">Choose a categorie</label>
                <select name="categories" id="categories">
                    {categories.map((category, index) => <option key={index} value={category["id"]}>{category["name"]}</option>)}
                </select>

                <select name="difficulty" id="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <select name="type" id="type">
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>


                <input onChange={(e) => setValueInput(Number(e.target.value))} type="number" name="amount" id="amount" min="1" max="50" value={valueInput}/>


                <button>Play</button>
            </form>
        </div>
  )
}

export default Home