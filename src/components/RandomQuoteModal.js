import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ModalBackdrop from './ModalBackdrop'

const RandomQuoteModal = ( {quote, characterInfo, cancelAccess} ) => {

  const [nextQuoteNumber, setnextQuoteNumber] = useState('');


  useEffect(() => {
    getNextQuoteNumber();
  }, [])

  const getNextQuoteNumber = () => {
  }



  return (
    <div>
      {/* height and width are temporarily there */}
      <img alt='' src={characterInfo.img} width='400px' height='600px'/>
      <h3>
        "{quote.quote}"
      </h3>
      <h4>-{quote.author}</h4>

      <div><Link to={`/quotes/random-quote/${nextQuoteNumber}`}><button>Click for another Random Quote</button></Link></div>
      
      <ModalBackdrop returnPageExtension='/quotes' cancel={cancelAccess}/>
    </div>
  )
}

export default RandomQuoteModal