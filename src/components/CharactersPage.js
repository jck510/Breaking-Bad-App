import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CharacterOption from './CharacterOption'
import CharacterList from './CharacterList'
import axios from 'axios'


// FOR NEXT TIME TRY TO FIND OUT HOW TO FILTER CHARACTERS WITH EACH KEY PRESS. PROBABLY EVENT LISTENERS. AND ALSO FIX BUG WHERE GOING BACK TO THE CHARACTER PAGE MAKES IT BLANK LIKELY AN ISSUE WITH THE USEEFFECT
const CharactersPage = () => {

  const [characters, setCharacters] = useState({});

  //will call the function once
  useEffect(() => {
    getCharacterList();
  }, [])

  
  const getCharacterList = () => {
    axios.get(`${process.env.REACT_APP_API_URL}characters`).then(
      (response) => {        
        console.log(response);
        setCharacters(response.data);
        //console.log('success');
      
      }).catch((error) => {
        //console.clear();
        console.log(error);
        console.log('Error');
    })
  }
  

  return (
    <div className='characters-page-div'>
      <div className='character-page-header'>
        <Link to='/'><FaRegArrowAltCircleLeft /></Link>
        <h1 className='page-title'>Characters</h1>
        <input type="text" placeholder='Search for a Character' />
      </div> 
    
    {characters !== [] && <CharacterList characters={characters}/>}
    
      
    </div>
  )
}

export default CharactersPage