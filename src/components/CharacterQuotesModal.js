import React, { useEffect } from 'react'
import ModalBackdrop from './ModalBackdrop'

const CharacterQuotesModal = ( {cancelAccess, character, quotes} ) => {

  // const queryName = (useLocation().pathname.replace('%'))

  useEffect(() => {
    console.log(character);
    console.log(quotes);
  }, [])

  return (
    <div>
      <ModalBackdrop returnPageExtension='/quotes' cancel={cancelAccess}/>
      <div className='character-quotes-modal-wrapper'>
        <div className='character-quotes-modal-div misc-text'>
          <img alt='' src={character.img} className='quote-image'/>
          <h1>{character.name}'s Quotes</h1>
          <div>
          {quotes.map(quote => (
            <li key={quote.quote_id}>"{quote.quote}"</li>
          ))}
          </div>

        </div>
        </div>
        
    </div>
  )
}

export default CharacterQuotesModal