import React from 'react'
import { Link } from 'react-router-dom'

const DeathOption = ({deathDetails, onSelect}) => {
  return (
    <div className='death-option-wrapper' onClick={onSelect}>
        <Link to={`/deaths/id/${deathDetails.death_id}`}>
        <div className='death-option-div'>
            <h3>{deathDetails.death}</h3>
        </div>
        </Link>
    </div>
  )
}

export default DeathOption