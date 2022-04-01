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

      <Link to='/episode-details/breaking-bad'><img alt='' src='../assets/images/breaking-bad-logo.jpg' width='400px' height='275px'/></Link>

      <h2>Choose which series to view episode details</h2>
      <FaArrowLeft />
      <FaArrowRight />

      <Link to='/episode-details/better-call-saul'><img alt='' src='../assets/images/better-call-saul-logo.jpg' width='400px' height='275px'/></Link>
    </div>
  )
}

export default EpisodeDetailsPage