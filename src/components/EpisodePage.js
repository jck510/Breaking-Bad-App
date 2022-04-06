import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';
import CharacterList from './CharacterList';

const EpisodePage = () => {

    const queryName = (useLocation().pathname.replaceAll('/', '').replace('episode-detailsid', ''));
    const [episodeDetails, setEpisodeDetails] = useState([]);
    const [charactersArray, setCharactersArray] = useState([]);
    

    useEffect(() => {
        verifyDomain(queryName);
        getEpisodeDetails(queryName);
        // getCharacterDetails();
    }, [queryName])

  const verifyDomain = (query) => {
    console.log(query);

  }  

  const getEpisodeDetails = (query) => {
    const characters = [];
      axios.get(`${process.env.REACT_APP_API_URL}episodes/${query}`).then(
          (response) => {
            console.log(response);
            setEpisodeDetails(response.data[0]);

            //FOR NEXT TIME GET ALL OF THE DETAILS FOR THE CHARACTERS TO BE DISPLAYED ON THE CHARACTERLIST COMPONENT

            // getting the specific details on the characters that appear in the episode
            axios.get(`${process.env.REACT_APP_API_URL}characters`).then(
                (res) => {
                    console.log(res);
                    
                    // for(let j = 0; j < res.data)
                    // for(let i = 0; i < response.data[0].characters.length; i++){
                    //     if(res.dataresponse.data[0].name.characters[i] )
                    //     console.log(response.data[0].characters[i]);
                    // }
                }
            ).catch((error) =>{
                console.log(error);
            })
            
        
            
            
          }
      ).catch((error) => {
          console.log(error);
      })
  }

  //function in order to get more details about the characters that appear in the episode
//   const getCharacterDetails = () => {
//       if(episodeDetails.characters === undefined){
//         console.log(episodeDetails.characters)
//         for(let i = 0; i < episodeDetails.characters.length; i++){
//             axios.get(`${process.env.REACT_APP_API_URL}characters?=name=${episodeDetails.characters[i]}`).then(
//                 (response) => {
//                     console.log(i)
//                     console.log(response.data[0]);
//                 }
//             ).catch((error) =>{
//                 console.log(error);
//             })
//         }
//         }
    
//   }

  return (
    <div>

    <div className='standard-header'>
        <Link to={(episodeDetails.series === 'Breaking Bad' ? '/episode-details/breaking-bad' : '/episode-details/better-call-saul')}><FaRegArrowAltCircleLeft className='back-button'/></Link>
        <h1>{episodeDetails.title}</h1>
    </div>

    <h3>{episodeDetails.title} was Season {episodeDetails.season}, Episode {episodeDetails.episode} of {episodeDetails.series}. It was aired on {episodeDetails.air_date}, and featured the following characters:</h3>


    <CharacterList characters={charactersArray} searchInput=''/>
    </div>
  )
}

export default EpisodePage