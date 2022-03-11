import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='home-page'>
        <div className='main-nav-bar'>
            <Link to='/'><h1>Breaking Bad Database</h1></Link>
            <Link to='/characters'><button>Characters</button></Link>
            <Link to='/episode-details'><button>Episode Details</button></Link>
            <Link to='/quotes'><button>Quotes</button></Link>
            <Link to='/deaths'><button>Deaths</button></Link>
            
        </div>
    </div>
  )
}

export default HomePage