import React from 'react'
import { FaRegArrowAltCircleLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const EpisodeDetailsPage = () => {
  return (
    <div className='episode-details-page-div'>
      <div className='standard-header'>
        <div><Link to='/'><FaRegArrowAltCircleLeft className='back-button'/></Link></div>
        <h1 className='page-title'>Episode Details</h1>
      </div>

      <div className='episode-details-options-div'>
      <Link to='/episode-details/breaking-bad'><img alt='' src='../assets/images/breaking-bad-logo.jpg'/></Link>

      <div className='episode-details-instructions-div'>
      <h2 className='misc-text'>Choose which series to view episode details about</h2>
      <div className='arrow-choice-wrapper'>
      <div><Link to='/episode-details/breaking-bad'><FaArrowLeft className='arrow-choice-button'/></Link></div>
      <div><Link to='/episode-details/better-call-saul'><FaArrowRight className='arrow-choice-button'/></Link></div>
      </div>
      </div>

      <Link to='/episode-details/better-call-saul'><img alt='' src='../assets/images/better-call-saul-logo.jpg'/></Link>
      </div>
    </div>
  )
}

export default EpisodeDetailsPage