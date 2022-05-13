import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import InvalidPage from './InvalidPage';

const CharacterDetailsPage = ( {character} ) => {

  // const [cameFromCharactersPage, setCameFromCharactersPage] = useState(character !== null); //not equal to null means it came from the previous page
  
  
  const queryName = (useLocation().pathname).replace('/characters/','').replaceAll('%20','+'); //sets a variable for the query name for the given character
  const [characterDetails, setCharacterDetails] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [isNonExistentDomain, setIsNonExistentDomain] = useState(false); // assumes that the domain is valid until it finds that it is not


  // will execute the getCharacterDetails function
  useEffect(() => {
    getCharacterDetails(queryName);
  }, [queryName]);
  
  const getCharacterDetails = (query) => { // a function to fetch the data from the api about the given character
    axios.get(`${process.env.REACT_APP_API_URL}characters?name=${query}`).then(
      (response) => {
        
        if(response.data.length === 0){
          setIsNonExistentDomain(true);
        }
        else{
          setCharacterDetails(response.data[0]);
          setIsLoaded(true);
        // if(response.data[0] !== 'undefined'){ // if the response data does not return an undefined value then the domain exists and the query can be completed successfully to display a character
        //   setIsNonExistentDomain(false);
        // }
        
          
        }

        
      }
    ).catch((error) => {
      
      // console.log('whoops');
      console.clear();
    })
  }


  return (
    <>
    
    {isNonExistentDomain ? <InvalidPage /> :
    <div className='character-details-page-div'>
      <div><Link to='/characters'><FaRegArrowAltCircleLeft to='/characters' className='back-button' size='40px'/></Link></div>
      {/* The following checks if the page details were loaded properly to display information to the user or not about the character that was queried */}
      
      {(isLoaded && !isNonExistentDomain) &&
      <div className='character-details-loaded-div'>
      <img alt='' src={characterDetails.img} />

      <div className='character-details-details misc-text'>

      <h1 className='page-title'>{characterDetails.name}</h1>
      <h2>"{characterDetails.nickname}"</h2>
      {/* Be prepared to remove birthday for characters who have an undefined birthday */}
      <h3>{(characterDetails.birthday !== 'Undefined') && `Birthday: ${characterDetails.birthday}`}</h3>
      <div className='occupation-div'>
      <h3>{(characterDetails.occupation.length > 1) ? `Occupations: ${characterDetails.occupation.map((occ) => (
        ' ' + occ
      ))}` : `Occupation: ${characterDetails.occupation[0]}`}</h3>
      
      </div>
      <h3>Portrayed by: {characterDetails.portrayed}</h3>
      {!showSpoilers ?
      <div className='character-details-spoiler-div'>
        <h2>Spoiler Warning!</h2>
        <h3>If you are not caught up with Breaking Bad and/or Better Call Saul then the following information may contain spoilers</h3>
        <button onClick={() => setShowSpoilers(true)} className='action-button'>See more information</button>
      </div>
      :
      <div className='character-details-spoiler-div'>
        <h3>Status: {characterDetails.status}</h3>
        {/* Breaking Bad Appearance Section */}
        {(characterDetails.appearance.length > 0) ?
        <h3>Appears in the following Breaking Bad Seasons: {characterDetails.appearance.map((app) => {
          if(characterDetails.appearance[characterDetails.appearance.length - 1] !== app){ // will add a comma to each of the seasons that the character appears in except for the last one
            return app + ', ';
          }
          else{
            return app;
          }
          })}</h3>
        :
        <h3>{characterDetails.name} does not appear in Breaking Bad</h3>
        }
        {/* Better Call Saul Appearance Section */}
        {(characterDetails.better_call_saul_appearance.length > 0) ?
        <h3>Appears in the following Better Call Saul Seasons: {characterDetails.better_call_saul_appearance.map((app) => {
          if(characterDetails.better_call_saul_appearance[characterDetails.better_call_saul_appearance.length - 1] !== app){ // will add a comma to each of the seasons that the character appears in except for the last one
            return app + ', ';
          }
          else{
            return app;
          }
          })}</h3>
        :
        <h3>As of Season 4, {characterDetails.name} has not appeared in Better Call Saul</h3>
        }
        <button onClick={() => setShowSpoilers(false)} className='action-button'>Show Less Info</button>
      </div>
      }
      </div>
      </div>
    }
      {!isLoaded &&
      <div></div>
      }
      {/* loading bar would go above */}

      

    </div>
    }
    </>
  )
}

export default CharacterDetailsPage