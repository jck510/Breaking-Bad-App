import React from 'react'
import { Link } from 'react-router-dom'

const DeathOption = ({deathDetails}) => {
  return (
    <div className='death-option-wrapper'>
        
        <div className='death-option-div'>
            <h3>{deathDetails.death}</h3>
        </div>
    </div>
  )
}

export default DeathOption