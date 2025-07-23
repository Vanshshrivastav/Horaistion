import React from 'react'
import Navbar from '../components/Navbar'
import Firstcarousel from '../components/Firstcarousel'
import Secondcarosal from '../components/Secondcarosal'
import Mosthome from '../components/Mosthome'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
        <Navbar/>
        <Firstcarousel/>
        <Secondcarosal/>
        <Mosthome/>
        <Footer/>
    </>
  )
}

export default Home