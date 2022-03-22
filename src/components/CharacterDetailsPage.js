import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'

const CharacterDetailsPage = ( {character} ) => {

  // const [cameFromCharactersPage, setCameFromCharactersPage] = useState(character !== null); //not equal to null means it came from the previous page
  // console.log(cameFromCharactersPage);
  // console.log((useLocation().pathname).replace('/characters/','').replaceAll('%20','+')); // query name (gets it from the URL and replaces the %20's with pluses for the api call )
  
  const queryName = (useLocation().pathname).replace('/characters/','').replaceAll('%20','+'); //sets a variable for the query name for the given character
  const [characterDetails, setCharacterDetails] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSpoilers, setShowSpoilers] = useState(false);


  // will execute the getCharacterDetails function
  useEffect(() => {
    getCharacterDetails(queryName);
  }, []);
  
  const getCharacterDetails = (query) => { // a function to fetch the data from the api about the given character
    axios.get(`${process.env.REACT_APP_API_URL}characters?name=${query}`).then(
      (response) => {
        console.log(response);
        setCharacterDetails(response.data[0]);
        setIsLoaded(true);
        console.log(response.data[0])
      }
    ).catch((error) => {
      console.log(error);
    })
  }

  const getOccupations = () =>{
    console.log('info')
    
  }
  // if(character === null){
  //   setCameFromCharactersPage(false);
  //   //axios.get();
  // }
  // else{
  //   setCameFromCharactersPage(true);
  // }

  return (
    <div className='character-details-page-div'>
      <FaRegArrowAltCircleLeft className='back-button' size='40px'/>
      {/* The following checks if the page details were loaded properly to display information to the user or not about the character that was queried */}
      {isLoaded ?
      <div className='character-details-loaded-div'>
      <img alt='' src={characterDetails.img} />
      <h1>{characterDetails.name}</h1>
      <h2>"{characterDetails.nickname}"</h2>
      {/* Be prepared to remove birthday for characters who have an undefined birthday */}
      <h3>{(characterDetails.birthday !== 'Undefined') && `Birthday: ${characterDetails.birthday}`}</h3>
      <div className='occupation-div'>
      <h3>{(characterDetails.occupation.length > 1) ? `Occupations: ` : `Occupation: `}</h3>
      {characterDetails.occupation.map((occ) => (
        <h3 key={occ}>{occ}</h3>
      ))}
      </div>
      <h3>Portrayed by: {characterDetails.portrayed}</h3>
      {!showSpoilers ?
      <div className='character-details-spoiler-div'>
        <h2>Spoiler Warning!</h2>
        <h3>If you are not caught up with Breaking Bad and/or Better Call Saul then the following information may contain spoilers</h3>
        <button onClick={() => setShowSpoilers(true)}>See more information</button>
      </div>
      :
      <div className='character-details-spoiler-div'>
        <h3>Status: {characterDetails.status}</h3>
        {/* Next time will add a conditional for characters that do not appear in breaking bad. will do the same for better call saul */}
        <h3>Appears in the following Breaking Bad Seasons: {characterDetails.appearance.map((app) => (
          app + ', '
        ))}</h3>
        <button onClick={() => setShowSpoilers(false)}>Show Less Info</button>
      </div>
      }
      </div>
      :
      <h1>Could not find character details!</h1>
      }


    </div>
  )
}

export default CharacterDetailsPage