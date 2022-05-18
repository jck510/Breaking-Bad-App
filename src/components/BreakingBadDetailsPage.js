import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import EpisodeList from './EpisodeList'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const BreakingBadDetailsPage = () => {

  const queryName = (useLocation().pathname.replaceAll('/', '')); //gets rid of the back slash in order to ensure that an extra one doesnt mess up the verification

  const [seasonFilter,setSeasonFilter] = useState('0');
  const [episodeList, setEpisodeList] = useState([]);

  const [seasonOneClass, setSeasonOneClass] = useState('');
  const [seasonTwoClass, setSeasonTwoClass] = useState('');
  const [seasonThreeClass, setSeasonThreeClass] = useState('');
  const [seasonFourClass, setSeasonFourClass] = useState('');
  const [seasonFiveClass, setSeasonFiveClass] = useState('');

  useEffect(() => {
    verifyDomain(queryName);
    getEpisodeList();
  }, [queryName])


  // function in order to verify whether or not the domain extension was valid and if any filters are supposed to be currently selected
  const verifyDomain = (query) => {
    if(query.charAt(query.length - 1) === 'd'){
      setSeasonFilter('0');


    }
    else if(parseInt(query.replace('episode-detailsbreaking-badseason','')) > 0 && parseInt(query.replace('episode-detailsbreaking-badseason','')) < 6){
      
      setSeasonFilter(query.replace('episode-detailsbreaking-badseason', '')); // sets the season filter to the proper domain extension
      switch(query.replace('episode-detailsbreaking-badseason', '')){ // switch statement to determine which extension is highlighted
        case '1':
          setSeasonOneClass('selected-button');
          break;
        case '2':
          setSeasonTwoClass('selected-button');
          break;
        case '3':
          setSeasonThreeClass('selected-button');
          break;
        case '4':
          setSeasonFourClass('selected-button');
          break;
        case '5':
          setSeasonFiveClass('selected-button');
          break;
        default:
          break;

      }

    }
    else{
      
      alert('Invalid season number, The page will be redirected to all seasons');
      window.location = '/episode-details/breaking-bad';
    }
  }

  const getEpisodeList = () =>{
    axios.get(`${process.env.REACT_APP_API_URL}episodes?series=Breaking+Bad`).then(
      (response) => {
        
        setEpisodeList(response.data);
      }
    ).catch((error) => {
      // console.log('error');
      console.clear();
    })
  }

  const toggleFilterPress = (filterPressed) => {
    if(filterPressed === seasonFilter){
      setSeasonFilter('0');
      switch(filterPressed){
        case '1':
          setSeasonOneClass('');
          break;
        case '2':
          setSeasonTwoClass('');
          break;
        case '3':
          setSeasonThreeClass('');
          break;
        case '4':
          setSeasonFourClass('');
          break;
        case '5':
          setSeasonFiveClass('');
          break;
        default:
          break;

      }


    }
    else{
      switch(seasonFilter){
        case '1':
          setSeasonOneClass('');
          break;
        case '2':
          setSeasonTwoClass('');
          break;
        case '3':
          setSeasonThreeClass('');
          break;
        case '4':
          setSeasonFourClass('');
          break;
        case '5':
          setSeasonFiveClass('');
          break;
        default:
          break;
      }
      setSeasonFilter(filterPressed);
      switch(filterPressed){
        case '1':
          setSeasonOneClass('selected-button');
          
          break;
        case '2':
          setSeasonTwoClass('selected-button');
          break;
        case '3':
          setSeasonThreeClass('selected-button');
          break;
        case '4':
          setSeasonFourClass('selected-button');
          break;
        case '5':
          setSeasonFiveClass('selected-button');
          break;
        default:
          break;

      }
    }
  }


  return (
    <div className='page-background'>
        <div className='standard-header'>
            <div><Link to='/episode-details' className='links'><FaRegArrowAltCircleLeft className='back-button'/></Link></div>
            <h1 className='page-title'>Breaking Bad</h1>
        </div>
        <div className='header-extension breaking-bad-page'>
            <div className='nav-bar-buttons-div'>
                {/* The following links have a ternary operator that will determine whether the page needs to be reloaded to the season extension or go back to the base extension */}
                <div><Link to={(seasonFilter !== '1') ? '/episode-details/breaking-bad/season/1' : '/episode-details/breaking-bad'} onClick={() => toggleFilterPress('1')} className={seasonOneClass}>Season 1</Link></div>
                <div><Link to={(seasonFilter !== '2') ? '/episode-details/breaking-bad/season/2' : '/episode-details/breaking-bad'} onClick={() => toggleFilterPress('2')} className={seasonTwoClass}>Season 2</Link></div>
                <div><Link to={(seasonFilter !== '3') ? '/episode-details/breaking-bad/season/3' : '/episode-details/breaking-bad'} onClick={() => toggleFilterPress('3')} className={seasonThreeClass}>Season 3</Link></div>
                <div><Link to={(seasonFilter !== '4') ? '/episode-details/breaking-bad/season/4' : '/episode-details/breaking-bad'} onClick={() => toggleFilterPress('4')} className={seasonFourClass}>Season 4</Link></div>
                <div><Link to={(seasonFilter !== '5') ? '/episode-details/breaking-bad/season/5' : '/episode-details/breaking-bad'} onClick={() => toggleFilterPress('5')} className={seasonFiveClass}>Season 5</Link></div>
            </div>
        </div>

        <EpisodeList seasonFilter={seasonFilter} episodes={episodeList} series='breaking-bad'/>
        


        

    </div>
  )
}

export default BreakingBadDetailsPage