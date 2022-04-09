import React from 'react'

const ModalBackdrop = ( {cancel} ) => {
  return (
    <div className='modal-backdrop' onClick={() => cancel()}>

    </div>
  )
}

export default ModalBackdrop