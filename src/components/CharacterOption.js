import React from 'react'
import { Link } from 'react-router-dom'

const CharacterOption = ({imageSource, characterName}) => {
  return (
    <div className='character-option-div-wrapper'>
      <Link className='character-option-link' to={`/characters/${characterName}`}><div className='character-option-div'>
        <img alt='' src={imageSource}/>
        <h3>{characterName}</h3>
    </div></Link>
    </div>
    
  )
}

export default CharacterOption