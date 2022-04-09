import axios from 'axios'
import React, { useEffect } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import CharacterList from './CharacterList'

const QuotesPage = () => {



  useEffect(() => {
    getCharacterList();
  }, [])

  //FOR NEXT TIME ONLY KEEP THE CHARACTERS THAT HAVE A QUOTE IN THE QUOTE RESPONSE. STORE THE CHARACTERS IN A STATE AND THEN PASS THEM INTO THE CHARACTER LIST WITH A SEARCHINPUT OF ''
  //function to get the list of characters who have quotes
  const getCharacterList = () => {

    axios.get(`${process.env.REACT_APP_API_URL}characters`).then(
      (allCharResponse) => {
        console.log(allCharResponse.data);

        axios.get(`${process.env.REACT_APP_API_URL}quotes`).then(
          (quotesResponse) => {
            console.log(quotesResponse.data);
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
        <FaRegArrowAltCircleLeft className='back-button' />
        <h1>Quotes</h1>
      </div>
      <div>
        <h2>Get Quotes By Character</h2>
        {/* <CharacterList /> */}
      </div>
      
    </div>
  )
}

export default QuotesPage