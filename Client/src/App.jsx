import React from 'react'
import Moviepage from './page/Moviepage'
import Home from './page/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Tvshow from './page/Tvshow'
import Topwatch from './page/Topwatch'
import Detailspage from './page/Detailspage'
import LoginPage from './page/Loginpage'
import Mostwatch from './page/Mostwatch'
import Animeinfo from './page/Animeinfo'
import Registerpage from './page/Registerpage'
import Dashboard from './page/Dashboard'
import Addmedia from './page/AddMedia'
import ProtectedRoute from './components/ProtectedRoute'
import Contact from './page/Contact'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/Register' element={<Registerpage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/movie" element={<Moviepage />} />
            <Route path="/animovie/:id" element={<Animeinfo />} />
            <Route path='/tvshow' element={<Tvshow />} />
            <Route path='/topairing' element={<Topwatch />} />
            <Route path='/aniproflie/:id' element={<Detailspage />} />
            <Route path='/Mostwatch' element={<Mostwatch />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/Addmedia' element={<Addmedia />} />
            <Route path='/contact' element={<Contact />} />
          </Route>
          <Route path='/' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
