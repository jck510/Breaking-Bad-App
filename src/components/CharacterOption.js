import React from 'react'
import { Link } from 'react-router-dom'

// image source is the link where the image for the character is displayed, the character name is the name of the character and the extension type is the location where the user will be taken when a character gets clicked
const CharacterOption = ({imageSource, characterName, extensionType}) => {
  return (
    <div className='character-option-div-wrapper'>
      {extensionType !== 'none' ? <Link className='links' to={`${extensionType}${characterName}`} onClick={window.scroll({
 top: 0, 
 left: 0, 
 behavior: 'smooth' 
})}>
    <div className='character-option-div'>
        <img alt='' src={imageSource}/>
        <h3>{characterName}</h3>
    </div></Link>
    :
    <div className='character-option-div'>
        <img alt='' src={imageSource}/>
        <h3>{characterName}</h3>
    </div>
    }
    </div>
    
  )
}

export default CharacterOption