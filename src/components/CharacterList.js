import React, { useEffect, useState } from 'react'
import CharacterOption from './CharacterOption';



const CharacterList = ({characters, searchInput, extensionType}) => {

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
    <div className='character-list-wrapper'>
      <div className='character-list-div'>
        {/* {charactersAvailable.valueOf} */}
        {characters.filter((character) => {
          if(searchInput === ''){
            return character;
          }
          else if(character.name.toLowerCase().includes(searchInput.toLowerCase()) || character.nickname.toLowerCase().includes(searchInput.toLowerCase())){ // if the name or nickname of the character contains the input being searched for it will return them
            return character;      
          }
          else{
            return null;
          }
        }).map(character => (
          <CharacterOption key={character.char_id} imageSource={character.img} characterName={character.name} extensionType={extensionType}/>
        ))}

    </div>
    </div>
    
  )
}

export default CharacterList