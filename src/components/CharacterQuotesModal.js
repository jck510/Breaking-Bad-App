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
        <div>
          <img alt='' src={character.img} height='400px'/>
          <h1>{character.name}'s Quotes</h1>
          {quotes.map(quote => (
            <li key={quote.quote_id}>{quote.quote}</li>
          ))}

        </div>
        <ModalBackdrop returnPageExtension='/quotes' cancel={cancelAccess}/>
    </div>
  )
}

export default CharacterQuotesModal