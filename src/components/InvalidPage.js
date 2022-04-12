import React from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const InvalidPage = ( {pageSection} ) => {
  return (
    <div>
        <div className='standard-header'>
            <div><Link to='/'><FaRegArrowAltCircleLeft className='back-button'/></Link></div>
            <h1>Page does not exist!</h1>

        </div>

        <h3>The page you are trying to access does not exist! Please ensure that the domain is entered in properly or please return to the home page and navigate to the page you are looking for</h3>
        <Link to='/'><button>Return Home</button></Link>
    </div>
  )
}

export default InvalidPage