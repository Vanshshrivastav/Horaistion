import React from 'react'
import { useParams } from 'react-router-dom'
import Information from '../components/Information'
import Navbar from '../components/Navbar'
import Actordata from '../components/Actordata'
import Trailer from '../components/Trailer'
import Footer from '../components/Footer'


const Aniproflie = () => {
    const { id } = useParams(); // ⬅️ get id from URL

    return (
        <div className='bg-[#1E1E1E] min-h-screen'>
            <Navbar />
            <Information animeId={id} /> {/* ⬅️ pass id as prop */}
            <Actordata animeId={id} />
            <Trailer animeId={id} />
            <Footer />
        </div>
    )
}

export default Aniproflie;
