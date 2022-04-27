import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const DeathDetailsPage = () => {

  const queryName = (useLocation().pathname.replaceAll('/', '').replace('deathsid', '')); // gets the id of the death from the url in order to load the death information from the database
  const [currentDeath, setCurrentDeath] = useState([]);


  useEffect(() => {
    console.log(queryName);
    axios.get(`${process.env.REACT_APP_API_URL}deaths`).then(
      (response) => {
        console.log(response);
        for(let i = 0; i < response.data.length; i++){ // for every death in the database
          if(queryName.toString() === response.data[i].death_id.toString()){
            setCurrentDeath(response.data[i]);
          }
        }
      }
    ).catch((error) => {
      console.log(error);
    })
  }, [queryName])


  return (
    <div>{currentDeath.death}</div>
  )
}

export default DeathDetailsPage