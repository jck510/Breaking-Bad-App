import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const CharacterDetailsPage = ( {character} ) => {

  // const [cameFromCharactersPage, setCameFromCharactersPage] = useState(character !== null); //not equal to null means it came from the previous page
  // console.log(cameFromCharactersPage);
  console.log((useLocation().pathname).replace('/characters/','').replaceAll('%20','+')); // query name (gets it from the URL and replaces the %20's with pluses for the api call )

  // if(character === null){
  //   setCameFromCharactersPage(false);
  //   //axios.get();
  // }
  // else{
  //   setCameFromCharactersPage(true);
  // }

  return (
    <div><h1>CharacterDetailsPage</h1></div>
  )
}

export default CharacterDetailsPage