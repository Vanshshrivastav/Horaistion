import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Tcarosal from '../components/topcard/Tcarosal'
import Most from '../components/Most'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
        <Navbar/>
        <Carousel/>
        <Tcarosal/>
        <Most/>
        <Footer/>
    </>
  )
}

export default Home