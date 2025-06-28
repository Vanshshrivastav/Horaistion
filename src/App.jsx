import React from 'react'
import Movie from './page/Movie'
import Home from './page/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Tvshow from './page/Tvshow'
import Topairing from './page/Topairing'
import Aniproflie from './page/Aniproflie'
import Login from './page/Loginpage'
import Mostwatch from './page/Mostwatch'

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
        <Route path='/Login' element={<Login/>} />
        <Route path='/Mostwatch' element={<Mostwatch/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App