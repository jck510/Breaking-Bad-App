import React, { useEffect, useState } from 'react'
import CharacterOption from './CharacterOption';



const CharacterList = ({characters}) => {

  // const [charactersAvailable, setCharactersAvailable] = useState('');

  // useEffect(() => {
  //   getCharacterOptions(characters);
  // }, [])

  //   const getCharacterOptions = (characterList) => {
  //     let characterCode = ''
  //       for(let i = 0; i < characterList.length; i++){
  //         console.log(characterList[i]);
  //         characterCode = characterCode + `<CharacterOption imageSource='${characterList[i].img}' characterName='${characterList[i].name}'/>`
  //       }
  //       setCharactersAvailable(characterCode);
  //   }

  return (
    <div>
        {/* {charactersAvailable.valueOf} */}
        {characters.map(character => (
          <CharacterOption imageSource={character.img} characterName={character.name}/>
        ))}

    </div>
  )
}

export default CharacterList