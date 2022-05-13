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
  const [randomQuoteCharacterInfo, setRandomQuoteCharacterInfo] = useState([]);
  const [allCharactersArray, setAllCharactersArray] = useState([]);
  const [allQuotesArray, setAllQuotesArray] = useState([]);

  const [currentCharacter, setCurrentCharacter] = useState([]);
  const [currentCharacterQuoteList, setCurrentCharacterQuoteList] = useState([]);


  // random quote must be preloaded in order for the routing to be secured in the click for random quote button
  useEffect(() => {
    if(quoteFrom === 'random'){ // if sent from an existing domain with a random quote
      getRandomQuote(nameToCheck); // will pass in the domain in the random quote function
    }
    else{
      getRandomQuote(); //will get a brand new random quote
    }
    getCharacterList(nameToCheck);
  }, [nameToCheck])

  

  
  

  // function to get a random quote from the database
  const getRandomQuote = (domainExtension) => {
    //console.log(domainExtension);

    if(domainExtension !== undefined){ // if the domain extension is not undefined that means that this is from an existing quote page
      axios.get(`${process.env.REACT_APP_API_URL}quotes/${domainExtension.replace('random-quote','')}`).then( // will get the random quote from the id listed in the url
        (preRandResponse) => {
          
          if(preRandResponse.data[0] === undefined){ // if the API returns an undefined response then the domain is InValid
            setIsValidDomain(false);
          }
          else{ // otherwise the reponse is valid and the random quote state can be set
            setRandomQuote(preRandResponse.data[0]);
          }
        }
      ).catch((error) => {
        console.clear();
      })

    }
    else{ // if it is undefined then this is being called for a fresh random quote
      axios.get(`${process.env.REACT_APP_API_URL}quote/random`).then(
        (randResponse) => {
          
          setRandomQuote(randResponse.data[0]);
        }
      ).catch((error) => {
        console.clear();
      })
    }


    
  }


  const exitModal = () => {
    setQuotesByCharacterModal(false);
    setRandomQuoteModal(false);
    //window.location.assign('/quotes');
  }
  
  //function to get the list of characters who have quotes
  const getCharacterList = (nameToCheck) => {

    const characters = [];
    

    axios.get(`${process.env.REACT_APP_API_URL}characters`).then(
      (allCharResponse) => {
        
        setAllCharactersArray(allCharResponse.data);

        axios.get(`${process.env.REACT_APP_API_URL}quotes`).then(
          (quotesResponse) => {
            

            const allQuotes = quotesResponse.data;
            setAllQuotesArray(allQuotes);
            

            for(let i = 0; i < quotesResponse.data.length; i++){ // for every quote in the database
              let backupName = quotesResponse.data[i].author.split(' ')[0];
              

              for(let j = 0; j < allCharResponse.data.length; j++){ // for every character in the breaking bad universe
                if(quotesResponse.data[i].author === allCharResponse.data[j].name || quotesResponse.data[i].author === allCharResponse.data[j].nickname || backupName === allCharResponse.data[j].name || backupName === allCharResponse.data[j].nickname){
                  if(!characters.includes(allCharResponse.data[j])){ //if the current character is not in the characters array (avoids duplicates)
                    characters.push(allCharResponse.data[j]);
                  }
                  if(quotesResponse.data[i].quote_id === randomQuote.quote_id){ // if the current quote matches the random quote that was selected then the random character info state gets updated
                    setRandomQuoteCharacterInfo(allCharResponse.data[j]);
                    
                  }
                }

              }
            }

            // console.log(nameToCheck.replace('random-quote',''));
            // console.log(allQuotes);
      
            
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
              let currChar = characters.filter(char => char.name === nameToCheck); //current character

              setCharactersArray(characters);
              setCurrentCharacter(currChar[0]); //updates the state of the current character

              const currCharQuotes = [];

              //The following for loop goes through every quote and sees if it matches the current character as the author and will add it to the array of quotes for that character
              for(let i = 0; i < allQuotes.length; i++){
                let backupName = allQuotes[i].author.split(' ')[0];

                if(allQuotes[i].author === currChar[0].name || allQuotes[i].author === currChar[0].nickname || backupName === currChar[0].name || backupName === currChar[0].nickname){
                    currCharQuotes.push(allQuotes[i]);
                }
                
              }

              setCurrentCharacterQuoteList(currCharQuotes);

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
          console.clear();
        })

      }
    ).catch((error) => {
      console.clear();
    })
  }



  return (
    <div>
      {!isValidDomain ? <InvalidPage /> :
      <div className='page-background'>
        {quotesByCharacterModal && <CharacterQuotesModal character={currentCharacter} quotes={currentCharacterQuoteList} cancelAccess={() => exitModal()}/>}
        {randomQuoteModal && <RandomQuoteModal quote={randomQuote} characterInfo={randomQuoteCharacterInfo} cancelAccess = {() => exitModal()} characters={charactersArray} allQuotes={allQuotesArray}/>}
        <div className='standard-header'>
          <div><Link to='/'><FaRegArrowAltCircleLeft className='back-button' /></Link></div>
          <h1 className='page-title'>Quotes</h1>
        </div>
        <div>
          <div className='quotes-instructions-div'>
          <div><Link to={`/quotes/random-quote/${randomQuote.quote_id}`}><button className='action-button'>Click for a Random Quote</button></Link></div>
          <h2 className='misc-text'>OR</h2>
          <h2 className='misc-text'>Get Quotes By Character</h2>
          </div>
          <CharacterList characters={charactersArray} searchInput='' extensionType='/quotes/'/>
        </div>
      </div>
      }

    </div>
  )
}

export default QuotesPage