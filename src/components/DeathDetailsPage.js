import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ModalBackdrop from './ModalBackdrop'

const DeathDetailsPage = ( {exitFunction} ) => {

  const queryName = (useLocation().pathname.replaceAll('/', '').replace('deathsid', '')); // gets the id of the death from the url in order to load the death information from the database
  const [currentDeath, setCurrentDeath] = useState([]);


  useEffect(() => {
    
    axios.get(`${process.env.REACT_APP_API_URL}deaths`).then(
      (response) => {
        
        for(let i = 0; i < response.data.length; i++){ // for every death in the database
          if(queryName.toString() === response.data[i].death_id.toString()){ // if the death matches the id in the url then it will set the state to the proper death
            setCurrentDeath(response.data[i]);
          }
        }
      }
    ).catch((error) => {
      console.clear();
    })
  }, [queryName])


  return (
    <div>
      {/* The following line is present to allow for the modal to only be displayed when the information has been properly loaded from the database */}
      {currentDeath.number_of_deaths > 0  && 
      <div>
      <ModalBackdrop returnPageExtension='/deaths' cancel={exitFunction}/>
      <div className='death-modal-div misc-text'>
      <h1 className='page-title'>{currentDeath.death}</h1>
      {currentDeath.number_of_deaths < 2 && <h3>{currentDeath.death} was killed in Breaking Bad, Season {currentDeath.season} Episode {currentDeath.episode}. The cause of death was {currentDeath.cause} This came at the hands of {currentDeath.responsible}.</h3>}
      {currentDeath.number_of_deaths > 1 && <h3>{currentDeath.death} were killed in Breaking Bad, Season {currentDeath.season} Episode {currentDeath.episode}. The cause of death was {currentDeath.cause} This came at the hands of {currentDeath.responsible}.</h3>}
      {currentDeath.last_words !== 'Unknown' && <h3>Their last words were "{currentDeath.last_words}"</h3>}
      </div>
      </div>
    }
    </div>
  )
}

export default DeathDetailsPage