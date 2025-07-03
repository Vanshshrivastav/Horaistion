import React from 'react'
import { useParams } from 'react-router-dom'
import Aniinfo from '../components/Aniinfo'
import Navbar from '../components/Navbar'
import Actordata from '../components/Actordata'
import Anitrailer from '../components/Anitrailer'
import Footer from '../components/Footer'
import Refad from '../components/Refad'

const Aniproflie = () => {
    const { id } = useParams(); // ⬅️ get id from URL

    return (
        <div className='bg-[#1E1E1E] min-h-screen'>
            <Navbar />
            <Aniinfo animeId={id} /> {/* ⬅️ pass id as prop */}
            <Actordata animeId={id} />
            <Refad />
            <Anitrailer animeId={id} />
            <Footer />
        </div>
    )
}

export default Aniproflie;
