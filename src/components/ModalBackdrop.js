import React from 'react'
import { Link } from 'react-router-dom'

const ModalBackdrop = ( {cancel, returnPageExtension} ) => {
  return (
    <Link to={returnPageExtension}><div className='modal-backdrop' onClick={() => cancel()}>
      
    </div>
    </Link>
  )
}

export default ModalBackdrop