import { useEffect, useState } from "react"

import serviceLocator from "../Firebase/serviceLocator"

function CharacterList() {
  const characterService = serviceLocator.services.characterService
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    characterService.callback = (data) => {
      const unsortedData = data.map(character => {
        if(character.isNPC) {
          return {
            ...character,
            initiative: Math.floor(Math.random()*20+1) + character.initiativeModifier
          }
        } else {
          return character
        }
      })
      const sortedData = unsortedData.sort((a,b) => {
        if(b.initiative < a.initiative) {
          return -1
        } else {
          return 1
        }
      })
      setCharacters(sortedData)
    }
  }, [])

  return (
    <div className='card'>
      <ul className=''>
        {(characters === null) ? null : characters.map(character => {
          return <li className='flex content-center justify-around p-5' key={character.name}>
            <h1 className='text-lg my-auto pr-2 w-10'>{character.name}</h1>
            <h1 className='text-lg my-auto pr-2 w-10'>{character.currentHp}/{character.maxHp}</h1>
            <h1 className='text-lg my-auto pr-2 w-10'>{character.initiative}</h1>
            <h1 className='text-lg my-auto pr-2 w-10'>{character.isNPC ? 'npc' : 'player'}</h1>
          </li>
        })}
      </ul>
    </div>
  )
}

export default CharacterList