import { useEffect, useState } from 'react'

import serviceLocator from '../Firebase/serviceLocator'
import Character from './Character'

function CharacterList({ name }) {
  const characterService = serviceLocator.services.characterService
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    async function setup() {
      const data = await characterService.getCharacters(name)
      updateCharacters(data)
      characterService.callback = updateCharacters
    }
    setup()
  }, [])
  
  async function updateCharacters(data) {
    const unsortedData = data.map(character => {
      if(character.isNPC && !name) {
        return {
          ...character,
          initiative: Math.floor(Math.random()*20+1) + character.initiativeModifier
        }
      } else {
        if(!name || character.name === name) {
          return character
        }
        return undefined
      }
    })
    let sortedData = unsortedData.filter(a => a)
    if(!name) {
      sortedData = unsortedData.sort((a,b) => {
        if(b.initiative < a.initiative) {
          return -1
        } else {
          return 1
        }
      })
    }
    setCharacters(sortedData)
  }
  
  return (
    <div className='card'>
      <ul className=''>
        {(characters === null) ? null : characters.map(character => {
          return <Character key={character.name} character={character}></Character>
        })}
      </ul>
    </div>
  )
}

export default CharacterList