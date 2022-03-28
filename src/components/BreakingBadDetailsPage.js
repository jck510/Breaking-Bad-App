import React from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import EpisodeList from './EpisodeList'

const BreakingBadDetailsPage = () => {
  return (
    <div>
        <div className='standard-header'>
            <FaRegArrowAltCircleLeft className='back-button'/>
            <h1>Breaking Bad</h1>
        </div>
        <div className='header-extension'>
            <div className='nav-bar-buttons-div'>
                <button>Season 1</button>
                <button>Season 2</button>
                <button>Season 3</button>
                <button>Season 4</button>
                <button>Season 5</button>
            </div>
        </div>

        <EpisodeList />
        


        

    </div>
  )
}

export default BreakingBadDetailsPage