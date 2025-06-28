import React from 'react'
import Aniinfo from '../components/Aniinfo'
import Navbar from '../components/Navbar'
import Actordata from '../components/Actordata'
import Anitrailer from '../components/Anitrailer'
import Footer from '../components/Footer'
import Refad from '../components/Refad'

const Aniproflie = () => {
    return (
        <>
            <div className='bg-[#1E1E1E] h-screen'>

                <Navbar />
                <Aniinfo />
                <Actordata />
                <Refad />
                <Anitrailer />
                
                <Footer />
            </div>
        </>
    )
}

export default Aniproflie