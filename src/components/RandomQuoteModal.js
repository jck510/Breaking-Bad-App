import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ModalBackdrop from './ModalBackdrop'

const RandomQuoteModal = ( {quote, characterInfo, cancelAccess, allQuotes, characters} ) => {

  //const [nextQuoteNumber, setNextQuoteNumber] = useState(0);
  const [characterImage, setCharacterImage] = useState('');

  

  useEffect(() => {
    if(characterInfo.img === undefined){ // if the user comes from a link they clicked then the characterinfo is still undefined so the following code is necessary to get the character picture
      // updateImage(quote.quote_id);
      for(let i = 0; i < allQuotes.length; i++){ 
      
        let backupName = allQuotes[i].author.split(' ')[0];
                
  
        for(let j = 0; j < characters.length; j++){ // for every character in the breaking bad universe
          if(allQuotes[i].author === characters[j].name || allQuotes[i].author === characters[j].nickname || backupName === characters[j].name || backupName === characters[j].nickname){
            
            if(allQuotes[i].quote_id === quote.quote_id){ // if the current quote matches the random quote that was selected then the random character info state gets updated
              setCharacterImage(characters[j].img);
                 
            }
          }
  
        }
  
      }
    }
    else{
      setCharacterImage(characterInfo.img);
    }
    console.log(characterInfo);
    
  }, [allQuotes,characterInfo])

  //FOLLOWING CODE IS COMMENTED OUT FOR FUTURE USE OF A CLICK FOR NEXT RANDOM QUOTE

  // const getNextQuoteNumber = () => {
  //   //setNextQuoteNumber(5);
  //   updateImage(10);
  //   return 10;
  // }

  // const updateImage = (quoteId) => {
  //   // console.log('test', quoteNumber);
  //   // console.log(characterInfo.img);
  //   // console.log(characters);
  //   // console.log(allQuotes);
  //   for(let i = 0; i < allQuotes.length; i++){ 
      
  //     let backupName = allQuotes[i].author.split(' ')[0];
              

  //     for(let j = 0; j < characters.length; j++){ // for every character in the breaking bad universe
  //       if(allQuotes[i].author === characters[j].name || allQuotes[i].author === characters[j].nickname || backupName === characters[j].name || backupName === characters[j].nickname){
          
  //         if(allQuotes[i].quote_id === quoteId){ // if the current quote matches the random quote that was selected then the random character info state gets updated
  //           //setCharacterImage(characters[j].img);
  //           console.log(characters[j]);
  //           //console.log(randomQuote.author + ' => ' + characters[j].name);              
  //         }
  //       }

  //     }

  //   }
    
  // }

//console.log(characterInfo);

  return (
    <div>
      <ModalBackdrop returnPageExtension='/quotes' cancel={cancelAccess}/>
      {/* height and width are temporarily there */}
      <div className='character-quotes-modal-wrapper'>
      <div className='character-quotes-modal-div'>
      <img alt='' src={characterImage} width='400px' height='600px'/>
      <h3>
        "{quote.quote}"
      </h3>
      <h4>-{quote.author}</h4>
      </div>
      </div>

      {/* <div><Link to={`/quotes/random-quote/${getNextQuoteNumber()}`}><button onClick={() => updateImage()}>Click for another Random Quote</button></Link></div> */}
      
      
    </div>
  )
}

export default RandomQuoteModal