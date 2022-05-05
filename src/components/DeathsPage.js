import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
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
    <div className='page-background'>

      {isDeathCurrentlySelected && <DeathDetailsPage exitFunction={() => setIsDeathCurrentlySelected(false)}/>}

      <div className='deaths-page-header'>
        <div className='standard-header'>
          <div><Link to='/'><FaRegArrowAltCircleLeft className='back-button'/></Link></div>
          <h1 className='page-title'>Deaths</h1>
        </div>
        <div className='num-of-deaths-div page-title'>
          <h3>Death Counter (As of Season 4 of Better Call Saul): <h2>{numberOfDeaths}</h2></h3>
        </div>
        
      </div>

    <div className='deaths-content-div misc-text'>
      <h2>Click on a death to reveal more details about it</h2>
      <DeathsList deaths={deathsList} onSelect={() => setIsDeathCurrentlySelected(true)}/>

    </div>
    </div>
  )
}

export default DeathsPage