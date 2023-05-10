import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'
import Game from './pages/game/Game'
import Result from './pages/result/Result'

const Pages = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/game" element={<Game/>}/>
                <Route path="/result" element={<Result/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Pages