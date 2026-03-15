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

import ProtectedRoute from './components/ProtectedRoute'
import Contact from './page/Contact'
import SearchPage from './page/SearchPage'
import WatchlistPage from './page/WatchlistPage'
import ErrorBoundary from './components/ErrorBoundary';
import AddMedia from './page/AddMedia'
import EditMedia from './page/EditMedia'
import Profile from './page/Profile'
import { ToastProvider } from './context/ToastContext'
import axios from 'axios';

// Axios global configuration
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


const App = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/Register' element={<Registerpage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/movie" element={<Moviepage />} />
              <Route path="/animovie/:id" element={<Animeinfo />} />
              <Route path='/tvshow' element={<Tvshow />} />
              <Route path='/topairing' element={<Topwatch />} />
              <Route path='/aniproflie/:id' element={<Detailspage />} />
              <Route path='/Mostwatch' element={<Mostwatch />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/profile' element={<Profile />} />
            </Route>

            {/* Admin Specific Routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/AddMedia' element={<AddMedia />} />
              <Route path="/edit-media/:id" element={<EditMedia />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
