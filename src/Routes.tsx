import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'

const Pages = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {/* <Route path="/game" component={game}/> */}
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Pages