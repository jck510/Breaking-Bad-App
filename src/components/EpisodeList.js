import React, { useEffect } from 'react'
import EpisodeOption from './EpisodeOption';

const EpisodeList = ( {episodes, seasonFilter} ) => {

  // useEffect(() => {
  //   filterEpisodes();
  // })

  // const filterEpisodes = () => {
  //   if(seasonFilter === 0){
  //     return episodes;
  //   }
  //   else{
  //     episodes.filter((episode) => {
  //       if(episode.season === seasonFilter){
  //         return episode;
  //       }
  //       else{
  //         return null;
  //       }
  //     }).map((episode) => (
  //       <EpisodeOption key={episode.episode_id} episode={episode}/>
  //     )) 
  //   }
        
  // }

  return (
    <div className='episode-list-div'>
      {seasonFilter === '0' && episodes.map((episode) =>(
        <EpisodeOption key={episode.episode_id} episode={episode}/>
      ))}
      {seasonFilter !== '0' && episodes.filter((episode) => {
        if(episode.season.replace(' ', '') === seasonFilter){ // this replace function was added to fix an error with the database that had a space in front of the 1 in season 1 episode 7
          return episode;
        }
        else{
          return null;
        }
      }).map((episode) => (
        <EpisodeOption key={episode.episode_id} episode={episode}/>
      ))}

    </div>
  )
}

export default EpisodeList