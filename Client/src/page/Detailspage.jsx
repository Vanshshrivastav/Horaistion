import React from 'react'
import { useParams } from 'react-router-dom'
import Information from '../components/Information'
import Navbar from '../components/Navbar'
import Actordata from '../components/Actordata'
import Trailer from '../components/Trailer'
import Footer from '../components/Footer'
import CommentSection from '../components/CommentSection'

const Aniproflie = () => {
    const { id } = useParams(); // ⬅️ get id from URL

    return (
        <div className='bg-[#121212] min-h-screen'>
            <Navbar />
            <Information animeId={id} /> {/* ⬅️ pass id as prop */}
            <Actordata animeId={id} />
            <Trailer animeId={id} />
            <CommentSection mediaId={id} />
            <Footer />
        </div>
    )
}

export default Aniproflie;
