import React from 'react'
import ModalBackdrop from './ModalBackdrop'

const RandomQuoteModal = ( {quote, cancelAccess} ) => {
  return (
    <div>
      <h3>
        {quote.quote}
      </h3>
      <ModalBackdrop cancel={cancelAccess}/>
    </div>
  )
}

export default RandomQuoteModal