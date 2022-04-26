import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import DeathsList from './DeathsList'

const DeathsPage = () => {

  const [deathsList, setDeathsList] = useState([]);


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}deaths`).then(
      (response) => {
        console.log(response.data);
        setDeathsList(response.data);
      }
    ).catch((error) => {
      console.log(error);
    })
  }, [])


  return (
    <div>
      <div className='standard-header'>
        <FaRegArrowAltCircleLeft className='back-button'/>
        <h1>Deaths</h1>

      </div>

      <h2>Click on a death to reveal more details about it</h2>
      <DeathsList deaths={deathsList}/>
    </div>
  )
}

export default DeathsPage