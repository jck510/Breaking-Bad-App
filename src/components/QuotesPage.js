import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import CharacterList from './CharacterList'
import CharacterQuotesModal from './CharacterQuotesModal'
import InvalidPage from './InvalidPage'

const QuotesPage = () => {

  const nameToCheck = useLocation().pathname.replace('quotes','').replaceAll('/','').replace('%20',' ');

  const [charactersArray, setCharactersArray] = useState([]);
  const [isValidDomain, setIsValidDomain] = useState(true);
  const [quotesByCharacterModal, setQuotesByCharacterModal] = useState(false);

  useEffect(() => {
    getCharacterList(nameToCheck);
  }, [nameToCheck])

  // FOR NEXT TIME SEE IF THERE IS A WAY TO CHANGE THE DOMAIN NAME WITHOUT REFRESHING THE PAGE WHEN WE TRIGGER THE EXITMODAL FUNCTION (REFRESHING MIGHT BE THE BEST SOLUTION IF A NO REFRESH SOLUTION DOES NOT LET THE SAME MODAL REAPPEAR AFTER BEING CLICKED AGAIN) Also provide functionality for the random quote button ALONG WITH HAVING THE MODAL POP UP FOR RANDOM QUOTES AND DYNAMICALLY ROUTE RANDOM QUOTES
  const verifyDomain = () => {

  }

  const exitModal = () => {
    setQuotesByCharacterModal(false);
    window.location.assign(window.location.pathname.replace(`/${nameToCheck.replace(' ', '%20')}`,''));
  }
  
  //function to get the list of characters who have quotes
  const getCharacterList = (nameToCheck) => {

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

            
      
            // domain check (for when users go directly from a domain name link rather than through the website)
            if(nameToCheck === ''){ //if there is no character to check in the domain then the domain is valid
              setCharactersArray(characters);
            }
            else if(characters.some(char => char.name === nameToCheck)){ //if there is a character that contains the name we are checking from the domain then the domain is valid and will set the quotesByCharacterModal to true
              setCharactersArray(characters);
              setQuotesByCharacterModal(true);
            }
            else{
              
              setIsValidDomain(false);
            }
            
            // for(let charIndex = 0; charIndex < characters.length; charIndex++){
            //   if(nameToCheck === characters[charIndex].name){
            //     console.log(true);
            //   }
            // }
            

            

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
      {!isValidDomain ? <InvalidPage /> :
      <div>
        {quotesByCharacterModal && <CharacterQuotesModal cancelAccess={() => exitModal()}/>}
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
      }

    </div>
  )
}

export default QuotesPage