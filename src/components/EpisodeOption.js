import React from 'react'

const EpisodeOption = ( {episode} ) => {
  return (
    <div>
        <h3>Season {episode.season}, Episode {episode.episode}</h3>
        <h3>"{episode.title}"</h3>
        <h4>Air Date: {episode.air_date}</h4>
    </div>
  )
}

export default EpisodeOption