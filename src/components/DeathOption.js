import React from 'react'
import { Link } from 'react-router-dom'

const DeathOption = ({deathDetails, onSelect}) => {
  return (
    <div className='death-option-wrapper' onClick={onSelect}>
        <Link to={`/deaths/id/${deathDetails.death_id}`} className='links'>
        <div className='death-option-div'>
            <h3>{deathDetails.death}</h3>
            <img alt='' src='../assets/images/breaking-bad-icon.png' className='smaller-icon'/>
        </div>
        </Link>
    </div>
  )
}

export default DeathOption