import React from 'react'
import { Link } from 'react-router-dom'

const CharacterOption = ({imageSource, characterName}) => {
  return (
    <Link className='character-option-link' to={`/characters/${characterName}`}><div className='character-option-div'>
        <img alt='' src={imageSource}/> {/* Width and height in here and not css for now. will change later */}
        <h3>{characterName}</h3>
    </div></Link>
  )
}

export default CharacterOption