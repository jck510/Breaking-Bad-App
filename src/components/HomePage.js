import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import SpoilerWarningModal from './SpoilerWarningModal';

const HomePage = () => {

  const [spoilerPageActive, setSpoilerPageActive] = useState('');

  // // function in order to process the what state that the spoiler modal should be in
  // const processSpoilerActivation = (action) => {
  //   if(action === 'quotes'){

  //   }
  //   else if(action === 'deaths'){

  //   }
  //   else if(action === 'cancel'){

  //   }
  // }

  const declineSpoilers = () => {
    setSpoilerPageActive('');
  }
  

  return (
    <>
    
    <div className='home-page'>

        <div className='main-nav-bar-div'>
          {/* will change the link for the h1 to a refresh onclick listener */}
          {/* The following links are wrapped in wrapper divs */}
            <div><h1 className='page-title'>Breaking Bad Data Lab</h1></div>
            <div className='nav-bar-buttons-wrapper'>
            <div className='nav-bar-buttons-div'>
            <div><Link to='/characters'>Characters</Link></div>
            <div><Link to='/episode-details'>Episode Details</Link></div>
            {/* The following lines are commented out to accomodate the spoiler warnings */}
            {/* <div><Link to='/quotes'><button>Quotes</button></Link></div>
            <div><Link to='/deaths'><button>Deaths</button></Link></div> */}
            <div><button onClick={() => setSpoilerPageActive('quotes')}>Quotes</button></div>
            <div><button onClick={() => setSpoilerPageActive('deaths')}>Deaths</button></div>
            </div>
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
        {/* {spoilerPageActive === 'quotes' && <SpoilerWarningModal sectionToAccess={spoilerPageActive} setSectionToAccess={() => setSpoilerPageActive}/>}
        {spoilerPageActive === 'deaths' && <SpoilerWarningModal sectionToAccess={spoilerPageActive} setSectionToAccess={() => setSpoilerPageActive}/>} */}


        
    </div>
        {spoilerPageActive === 'quotes' && <SpoilerWarningModal sectionToAccess={spoilerPageActive} cancelAccess={declineSpoilers}/>}
        {spoilerPageActive === 'deaths' && <SpoilerWarningModal sectionToAccess={spoilerPageActive} cancelAccess={declineSpoilers}/>}
    </>
  )
}

export default HomePage