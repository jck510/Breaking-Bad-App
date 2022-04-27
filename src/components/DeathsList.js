import React from 'react'
import DeathOption from './DeathOption'

const DeathsList = ( { deaths } ) => {
  return (
    <div>
        {deaths.map((death) => (
            <DeathOption key={death.death_id} deathDetails={death}/>
        ))}
    </div>
  )
}

export default DeathsList