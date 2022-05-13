import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import CharacterList from './CharacterList'
import axios from 'axios'


const CharactersPage = () => {

  const [characters, setCharacters] = useState({});
  const [charactersLoaded, setCharactersLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState('');

   //will call the function once
   useEffect(() => {
     getCharacterList();
  }, [])

  
  const getCharacterList = () => {
    axios.get(`${process.env.REACT_APP_API_URL}characters`).then(
      (response) => {        
        
        setCharacters(response.data);
        setCharactersLoaded(true);
        
      
      }).catch((error) => {
        console.clear();
        
    })
  }
  

  return (
    <div className='characters-page-div'>
      <div className='characters-page-header'>
        <div className='characters-page-header-back-and-title'>
          <Link to='/'><FaRegArrowAltCircleLeft className='back-button' color='#FFFFFF' size='40px'/></Link>
          <h1 className='page-title'>Characters</h1>
        </div>
        <input type="text" placeholder='Search for a Character' onChange={(e) => {
          setSearchInput(e.target.value);
        }} />
      </div> 
    
    
    {charactersLoaded && <CharacterList characters={characters} searchInput={searchInput} extensionType='/characters/'/>}
    
      
    </div>
  )
}

export default CharactersPage