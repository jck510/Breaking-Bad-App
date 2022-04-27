import React from 'react'
import { Link } from 'react-router-dom'

const DeathOption = ({deathDetails}) => {
  return (
    <div className='death-option-wrapper'>
        <Link to={`/deaths/id/${deathDetails.death_id}`}>
        <div className='death-option-div'>
            <h3>{deathDetails.death}</h3>
        </div>
        </Link>
    </div>
  )
}

export default DeathOption