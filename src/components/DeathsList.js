import React from 'react'
import DeathOption from './DeathOption'

const DeathsList = ( { deaths } ) => {
  return (
    <div>
        {deaths.map((death) => (
            <DeathOption key={death} deathDetails={death}/>
        ))}
    </div>
  )
}

export default DeathsList