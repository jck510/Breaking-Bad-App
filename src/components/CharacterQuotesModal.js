import React from 'react'
import ModalBackdrop from './ModalBackdrop'

const CharacterQuotesModal = ( {cancelAccess} ) => {
  return (
    <div>
        <div>CharacterQuotesModal</div>
        <ModalBackdrop cancel={cancelAccess}/>
    </div>
  )
}

export default CharacterQuotesModal