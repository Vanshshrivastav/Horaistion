import React from 'react'
import Moviepage from './page/Moviepage'
import Home from './page/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Tvshow from './page/Tvshow'
import Topwatch from './page/Topwatch'
import Detailspage from './page/Detailspage'
import Login from './page/Loginpage'
import Mostwatch from './page/Mostwatch'

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Moviepage />} />
          <Route path='/tvshow' element={<Tvshow />} />
          <Route path='/topairing' element={<Topwatch />} />
          <Route path='/aniproflie/:id' element={<Detailspage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Mostwatch' element={<Mostwatch />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App