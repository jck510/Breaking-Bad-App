import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import EpisodeList from './EpisodeList'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const BreakingBadDetailsPage = () => {

  const queryName = (useLocation().pathname.replaceAll('/', '')); //gets rid of the back slash in order to ensure that an extra one doesnt mess up the verification

  const [seasonFilter,setSeasonFilter] = useState('0');
  const [episodeList, setEpisodeList] = useState([]);

  useEffect(() => {
    verifyDomain(queryName);
    getEpisodeList();
  }, [queryName])


  //FOR NEXT TIME WORK ON THE BUTTON COLOR COATING FOR THE SELECTED BUTTON, HAVE THE SITE REDIRECT TO THE BREAKING-BAD EXTENSION IF ITS AN INVALID EXTENSION USING AN ALERT WITH AN ONCLICK LISTENER THAT TAKES THE PAGE TO THE PROPER EXTENSION
  const verifyDomain = (query) => {
    if(query.charAt(query.length - 1) === 'd'){
      console.log('breaking-bad extension');
      setSeasonFilter('0');


    }
    else if(parseInt(query.replace('episode-detailsbreaking-badseason','')) > 0 && parseInt(query.replace('episode-detailsbreaking-badseason','')) < 6){
      console.log('season number extension');
      setSeasonFilter(query.replace('episode-detailsbreaking-badseason', '')); // sets the season filter to the proper domain extension
    }
    else{
      console.log('invalid extension');
    }
  }

  const getEpisodeList = () =>{
    axios.get(`${process.env.REACT_APP_API_URL}episodes?series=Breaking+Bad`).then(
      (response) => {
        console.log(response.data);
        setEpisodeList(response.data);
      }
    ).catch((error) => {
      console.log(error);
    })
  }

  const toggleFilterPress = (filterPressed) => {
    if(filterPressed === seasonFilter){
      setSeasonFilter('0');
    }
    else{
      setSeasonFilter(filterPressed);
    }
  }


  return (
    <div>
        <div className='standard-header'>
            <div><Link to='/episode-details'><FaRegArrowAltCircleLeft className='back-button'/></Link></div>
            <h1>Breaking Bad</h1>
        </div>
        <div className='header-extension'>
            <div className='nav-bar-buttons-div'>
                <button onClick={() => toggleFilterPress('1')}>Season 1</button>
                <button onClick={() => toggleFilterPress('2')}>Season 2</button>
                <button onClick={() => toggleFilterPress('3')}>Season 3</button>
                <button onClick={() => toggleFilterPress('4')}>Season 4</button>
                <button onClick={() => toggleFilterPress('5')}>Season 5</button>
            </div>
        </div>

        <EpisodeList seasonFilter={seasonFilter} episodes={episodeList}/>
        


        

    </div>
  )
}

export default BreakingBadDetailsPage