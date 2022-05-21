import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';
import CharacterList from './CharacterList';
import InvalidPage from './InvalidPage';

const EpisodePage = () => {

    const queryName = (useLocation().pathname.replaceAll('/', '').replace('episode-detailsid', ''));
    const [episodeDetails, setEpisodeDetails] = useState([]);
    const [charactersArray, setCharactersArray] = useState([]);
    const [invalidCall, setInvalidCall] = useState(false);
    

    useEffect(() => {
        // verifyDomain(queryName);
        getEpisodeDetails(queryName);
        // getCharacterDetails();
    }, [queryName])

  // const verifyDomain = (query) => {
  //   console.log(query);

  //   axios.get(`${process.env.REACT_APP_API_URL}episodes/${query}`)

  // }  

  const getEpisodeDetails = (query) => {
    const characters = [];
      axios.get(`${process.env.REACT_APP_API_URL}episodes/${query}`).then(
          (response) => {
            

            if(response.data.length === 0){
              
              setInvalidCall(true);
            }
            else{
              setEpisodeDetails(response.data[0]);

            

            // getting the specific details on the characters that appear in the episode
            axios.get(`${process.env.REACT_APP_API_URL}characters`).then(
                (res) => {

                    
                    for(let i = 0; i < response.data[0].characters.length; i++){ // for each character in the episode
                      
                      let backupName = response.data[0].characters[i].split(' ')[0]; 
                        for(let j = 0; j < res.data.length; j++){ // for every character that exists in the breaking bad universe
                          
                          //this line was moved outside of this for loop
                          // let backupName = response.data[0].characters[i].split(' ')[0];


                          // var backupName = '';
                          // //switch statement necessary due to inconsistent character naming in the database
                          // switch(response.data[0].characters[i]){
                          //   case 'Mike Erhmantraut':
                          //     backupName = 'Mike Ehrmantraut';
                          //     break;
                          //   case 'Kim Wexler':
                          //     backupName = 'Kimberly Wexler';
                          //     break;
                          //   case 'Chuck McGill':
                          //     backupName = 'Charles McGill';
                          //     break;
                          //   case 'Nacho Varga':
                          //     backupName = 'Ignacio Varga';
                          //     break;
                          //   default:
                          //     break;
                          // }


                          if(response.data[0].characters[i] === res.data[j].name || response.data[0].characters[i] === res.data[j].nickname || backupName === res.data[j].name || backupName === res.data[j].nickname){
                            
                            characters.push(res.data[j]);
              
                          }
                      
                        }
                        
                        
                    }
                    setCharactersArray(characters);
                }
            ).catch((error) =>{
                console.clear();
            })
            
        
            
            
          } // end of the else statement
            } // end of the response function

            
      ).catch((error) => {
          console.clear();
      })
  }

  //function in order to get more details about the characters that appear in the episode
//   const getCharacterDetails = () => {
//       if(episodeDetails.characters === undefined){
//         console.log(episodeDetails.characters)
//         for(let i = 0; i < episodeDetails.characters.length; i++){
//             axios.get(`${process.env.REACT_APP_API_URL}characters?=name=${episodeDetails.characters[i]}`).then(
//                 (response) => {
//                     
//                 }
//             ).catch((error) =>{
//                 console.clear();
//             })
//         }
//         }
    
//   }

  return (
    <div className='episode-page-wrapper'>

    {invalidCall ? <InvalidPage /> : 
    
    <div className='page-background'>
    <div className='standard-header'>
        <Link to={(episodeDetails.series === 'Breaking Bad' ? '/episode-details/breaking-bad' : '/episode-details/better-call-saul')}><FaRegArrowAltCircleLeft className='back-button'/></Link>
        <h1 className='page-title'>{episodeDetails.title}</h1>
    </div>

    <h3 className='episode-description misc-text'>"{episodeDetails.title}" was Season {episodeDetails.season}, Episode {episodeDetails.episode} of {episodeDetails.series}. It aired on {episodeDetails.air_date}, and featured the following characters:</h3>


    <CharacterList characters={charactersArray} searchInput='' extensionType='none'/>
    </div>
    }
    </div>
    
  )
}

export default EpisodePage