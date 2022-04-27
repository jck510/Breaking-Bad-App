import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import DeathDetailsPage from './DeathDetailsPage'
import DeathsList from './DeathsList'

const DeathsPage = ( {isSelected} ) => {

  const [deathsList, setDeathsList] = useState([]);
  const [numberOfDeaths, setNumberOfDeaths] = useState(0);
  const [isDeathCurrentlySelected, setIsDeathCurrentlySelected] = useState(false);

  //FOR NEXT TIME
  // PROPERLY ADD THE MODAL FOR THE DEATH INFORMATION OF THE CURRENT DEATH TO BE DISPLAYED

  useEffect(() => {

    if(isSelected === true){
      setIsDeathCurrentlySelected(true);
    }

    // gets all the deaths that occured in the series
    axios.get(`${process.env.REACT_APP_API_URL}deaths`).then(
      (response) => {
        console.log(response.data);
        setDeathsList(response.data);
      }
    ).catch((error) => {
      console.log(error);
    })

    // gets the total number of deaths in the series
    axios.get(`${process.env.REACT_APP_API_URL}death-count`).then(
      (res) => {
        console.log(res.data[0].deathCount);
        setNumberOfDeaths(res.data[0].deathCount);
      }
    ).catch((err) => {
      console.log(err);
    })

  }, [])


  return (
    <div>

      {isDeathCurrentlySelected && <DeathDetailsPage />}

      <div className='deaths-page-header'>
        <div>
          <FaRegArrowAltCircleLeft className='back-button'/>
          <h1>Deaths</h1>
        </div>
        <div className='num-of-deaths-div'>
          <h3>Death Counter (As of Season 4 of Better Call Saul):</h3>
          <h3>{numberOfDeaths}</h3>
        </div>
        
      </div>

      <h2>Click on a death to reveal more details about it</h2>
      <DeathsList deaths={deathsList}/>
    </div>
  )
}

export default DeathsPage