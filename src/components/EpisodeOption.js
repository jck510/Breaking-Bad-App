import React from 'react'
import { Link } from 'react-router-dom'

const EpisodeOption = ( {episode,series, filterOn} ) => {
  // console.log(episode);
  return (
    <div className='episode-option-wrapper'>
      {/* <Link to={(episode.series === 'Breaking Bad') ? `/episode-details/breaking-bad/season/${episode.season.replace(' ', '')}/episode/${episode.episode}` : `/episode-details/better-call-saul/season/${episode.season}/episode/${episode.episode}`}> */}
      <Link to={`/episode-details/id/${episode.episode_id}`} className='links'>
      
    <div className='episode-option-div'>
        <h3>Season {episode.season}, Episode {episode.episode}</h3>
        <h3>"{episode.title}"</h3>
        {/* <h4>Air Date: {episode.air_date}</h4> */}
        {!filterOn && <img alt='' src={series === 'breaking-bad' ? '../assets/images/breaking-bad-icon.png' : '../assets/images/better-call-saul-icon.png'} className='small-icon'/>}
        {filterOn && <img alt='' src={series === 'breaking-bad' ? '../../../assets/images/breaking-bad-icon.png' : '../../../assets/images/better-call-saul-icon.png'} className='small-icon'/>}
    </div>
    </Link>
    </div>
  )
}

export default EpisodeOption