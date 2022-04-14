import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import CharacterList from './CharacterList'
import CharacterQuotesModal from './CharacterQuotesModal'
import InvalidPage from './InvalidPage'
import RandomQuoteModal from './RandomQuoteModal'

const QuotesPage = ( {quoteFrom} ) => {

  const nameToCheck = useLocation().pathname.replace('quotes','').replaceAll('/','').replace('%20',' ');

  const [charactersArray, setCharactersArray] = useState([]);
  const [isValidDomain, setIsValidDomain] = useState(true);
  const [quotesByCharacterModal, setQuotesByCharacterModal] = useState(false);
  const [randomQuoteModal, setRandomQuoteModal] = useState(false);
  const [randomQuote, setRandomQuote] = useState([]);

  useEffect(() => {
    getRandomQuote();
    getCharacterList(nameToCheck);
  }, [nameToCheck])

  // FOR NEXT TIME SEE IF THERE IS A WAY TO CHANGE THE DOMAIN NAME WITHOUT REFRESHING THE PAGE WHEN WE TRIGGER THE EXITMODAL FUNCTION (REFRESHING MIGHT BE THE BEST SOLUTION IF A NO REFRESH SOLUTION DOES NOT LET THE SAME MODAL REAPPEAR AFTER BEING CLICKED AGAIN) AND FIX THE REACT HOOK USEEFFECT HAVING MISSING DEPENDENCIES WARNING AND HAVE THE RANDOM QUOTE CHARACTER GET STORED IN A STATE TO BE PASSED INTO THE RANDOM QUOTE MODAL AND POPULATE THE BOTH THE RANDOM MODAL AND CHARACTER QUOTE MODAL WITH THE PROPER INFO NEEDED. ALSO ADD BUTTON THAT GETS ANOTHER RANDOM QUOTE WITHIN THE RANDOM QUOTE MODAL
  

  // function to get a random quote from the database
  const getRandomQuote = () => {
    console.log(nameToCheck.replace('random-quote',''));
    if(quoteFrom === 'random'){
      axios.get(`${process.env.REACT_APP_API_URL}quotes/${nameToCheck.replace('random-quote','')}`).then( // will get the random quote from the id listed in the url
        (preRandResponse) => {
          console.log(preRandResponse.data[0]);
          setRandomQuote(preRandResponse.data[0]);
        }
      ).catch((error) => {
        console.log(error);
      })
    }
    else{
      axios.get(`${process.env.REACT_APP_API_URL}quote/random`).then(
        (randResponse) => {
          console.log(randResponse.data[0]);
          setRandomQuote(randResponse.data[0]);
        }
      ).catch((error) => {
        console.log(error);
      })
    }
    
  }

  const exitModal = () => {
    setQuotesByCharacterModal(false);
    setRandomQuoteModal(false);
    window.location.assign('/quotes');
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

            const allQuotes = quotesResponse.data;

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

            console.log(nameToCheck.replace('random-quote',''));
            console.log(allQuotes);
      
            
            // if(nameToCheck === ''){ //if there is no character to check in the domain then the domain is valid
            //   setCharactersArray(characters);
            // }

            // domain check (for when users go directly from a domain name link rather than through the website)
            if(quoteFrom === undefined){ //if the quoteFrom prop is undefined then there is no domain extension to check and the domain is valid
                setCharactersArray(characters);
                // the following lines are to reset the modals if the new page extension changes back to the quotes page
                setQuotesByCharacterModal(false);
                setRandomQuoteModal(false);
            }
            else if(quoteFrom === 'character' && characters.some(char => char.name === nameToCheck)){ //if there is a character that contains the name we are checking from the domain then the domain is valid and will set the quotesByCharacterModal to true
              setCharactersArray(characters);
              setQuotesByCharacterModal(true);
              setRandomQuoteModal(false);
            }
            else if(quoteFrom === 'random' && allQuotes.some(quote => quote.quote_id === parseInt(nameToCheck.replace('random-quote','')))){
              setCharactersArray(characters);
              setQuotesByCharacterModal(false);
              setRandomQuoteModal(true);
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

  const verifyDomain = () => {

  }

  return (
    <div>
      {!isValidDomain ? <InvalidPage /> :
      <div>
        {quotesByCharacterModal && <CharacterQuotesModal cancelAccess={() => exitModal()}/>}
        {randomQuoteModal && <RandomQuoteModal quote={randomQuote} cancelAccess = {() => exitModal()}/>}
        <div className='standard-header'>
          <div><Link to='/'><FaRegArrowAltCircleLeft className='back-button' /></Link></div>
          <h1>Quotes</h1>
        </div>
        <div>
          <div><Link to={`/quotes/random-quote/${randomQuote.quote_id}`}><button>Click for a Random Quote</button></Link></div>
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