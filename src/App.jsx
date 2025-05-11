import React from 'react'
import Movie from './page/Movie'
import Home from './page/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Tvshow from './page/Tvshow'
import Topairing from './page/Topairing'
import Aniproflie from './page/Aniproflie'

const App = () => {
  return (
    <>
      <BrowserRouter>
      
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path='/tvshow' element={<Tvshow/>} />
        <Route path='/topairing' element={<Topairing/>} />
        <Route path='/aniproflie' element={<Aniproflie/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App