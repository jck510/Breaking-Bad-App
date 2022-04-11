import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CharacterList from './CharacterList'

const QuotesPage = () => {

  const [charactersArray, setCharactersArray] = useState([]);

  useEffect(() => {
    getCharacterList();
  }, [])

  // FOR NEXT TIME VERIFY THAT THE DOMAIN GIVEN CONTAINS A PROPER CHARACTER WHO HAS A QUOTE IN THE DATABASE, CHANGING THE QUOTE PAGE TO HAVE A MODAL POP UP TO DISPLAY THE CHARACTER PICTURE, NAME AND LIST OF THEIR QUOTES. IF CHARACTER HAS QUOTE, WILL SPAWN MODAL USING STATES. Also provide functionality for the random quote button
  const verifyDomain = () => {

  }
  
  //function to get the list of characters who have quotes
  const getCharacterList = () => {

    const characters = [];

    axios.get(`${process.env.REACT_APP_API_URL}characters`).then(
      (allCharResponse) => {
        console.log(allCharResponse.data);

        axios.get(`${process.env.REACT_APP_API_URL}quotes`).then(
          (quotesResponse) => {
            console.log(quotesResponse.data);


            for(let i = 0; i < quotesResponse.data.length; i++){ // for every quote in the database
              let backupName = quotesResponse.data[i].author.split(' ')[0];
              

              for(let j = 0; j < allCharResponse.data.length; j++){ // for every character in the breaking bad universe
                if(quotesResponse.data[i].author === allCharResponse.data[j].name || quotesResponse.data[i].author === allCharResponse.data[j].nickname || backupName === allCharResponse.data[j].name || backupName === allCharResponse.data[j].nickname){
                  if(!characters.includes(allCharResponse.data[j])){ //if the current character is not in the characters array (avoids duplicates)
                    characters.push(allCharResponse.data[j]);
                  }
                }

              }
            }

            setCharactersArray(characters);

          }
        ).catch((err) => {
          console.log(err);
        })

      }
    ).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div>
      <div className='standard-header'>
        <div><Link to='/'><FaRegArrowAltCircleLeft className='back-button' /></Link></div>
        <h1>Quotes</h1>
      </div>
      <div>
        <button>Click for a Random Quote</button>
        <h2>OR</h2>
        <h2>Get Quotes By Character</h2>
        <CharacterList characters={charactersArray} searchInput='' extensionType='/quotes/'/>
      </div>
      
    </div>
  )
}

export default QuotesPage