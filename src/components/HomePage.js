import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='home-page'>
        <div className='main-nav-bar-div'>
          {/* will change the link for the h1 to a refresh onclick listener */}
            <Link to='/' className='links'><h1>Breaking Bad Database</h1></Link>
            <div className='nav-bar-buttons-div'>
            <Link to='/characters'><button>Characters</button></Link>
            <Link to='/episode-details'><button>Episode Details</button></Link>
            <Link to='/quotes'><button>Quotes</button></Link>
            <Link to='/deaths'><button>Deaths</button></Link>

            </div>
          
            
        </div>
        <div className='auto-slider'>
        <ul className='main-photos-list'>
            <li><img alt='' src='../assets/images/mainphoto1.jpg'/></li>
            <li><img alt='' src='../assets/images/mainphoto2.jpg'/></li>
            <li><img alt='' src='../assets/images/mainphoto3.jpg'/></li>
            <li><img alt='' src='../assets/images/mainphoto4.jpg'/></li>
        </ul>

        </div>

        <div className='main-footer-div'>

        </div>
    </div>
  )
}

export default HomePage