import React from 'react'
import DeathOption from './DeathOption'

const DeathsList = ( { deaths, onSelect } ) => {
  return (
    <div className='deaths-list-div'>
        {deaths.map((death) => (
            <DeathOption key={death.death_id} deathDetails={death} onSelect={onSelect}/>
        ))}
    </div>
  )
}

export default DeathsList