import React from 'react'
import { Link } from 'react-router-dom'
import ModalBackdrop from './ModalBackdrop'

const SpoilerWarningModal = ({ sectionToAccess, cancelAccess }) => {
  return (
    <>
    <ModalBackdrop returnPageExtension='/' cancel={cancelAccess}/>
    <div className='spoiler-modal-div'>
      <div className='spoiler-modal-content-div'>
        <h1>Spoiler Warning</h1>
        {(sectionToAccess === 'quotes') && <h3>Some quotes on the following page may contain spoilers for Breaking Bad and/or Better Call Saul if you are not caught up with the series</h3>}
        {(sectionToAccess === 'deaths') && <h3>The information on the following page may contain huge spoilers for Breaking Bad and/or Better call Saul if you are not caught up with the series</h3>}
        {(sectionToAccess === 'quotes') && <Link to='/quotes'><button className='action-button'>I understand and accept</button></Link>}
        {(sectionToAccess === 'deaths') && <Link to='/deaths'><button className='action-button'>I understand and accept</button></Link>}
      </div>
    </div>
    
    </>
  )
}

export default SpoilerWarningModal