import React from 'react'

const CharacterOption = ({imageSource, characterName}) => {
  return (
    <div className='character-option-div'>
        <img alt='' src={imageSource}/> {/* Width and height in here and not css for now. will change later */}
        <h3>{characterName}</h3>
    </div>
  )
}

export default CharacterOption