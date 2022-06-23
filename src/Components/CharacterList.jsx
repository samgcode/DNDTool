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

  async function updateCharacters(data) { //TODO: refactor
    const unsortedData = data.filter(character => {
      if (character.isNPC && !name) {
        return character
      } else {
        if (!name || character.name === name) {
          return character
        }
        return undefined
      }
    })
    setCharacters(unsortedData)
  }

  function rollInitiative() {
    const data = characters.map(character => {
      if (character.isNPC) {
        return {
          ...character,
          initiative: Math.floor(Math.random() * 20 + 1) + character.initiativeModifier
        }
      } else {
        return character
      }
    })
    let sortedData = data.filter(a => a)
    if (!name) {
      sortedData = data.sort((a, b) => {
        if (b.initiative < a.initiative) {
          return -1
        } else {
          return 1
        }
      })
    }
    setCharacters(sortedData)

  }
  return (
    <>
      <div className='card'>
        <ul className=''>
          <Character showHeadings={true}></Character>
          {(characters === null) ? null : characters.map(character => {
            return <Character key={character.name} character={character}></Character>
          })}
        </ul>
      </div>
      {(name === undefined) ? <div className='m-10 flex'>
        <button className='btn btn-success-filled' onClick={rollInitiative}>Roll initiative</button>
        <button className='btn btn-success-filled ml-3'>Next turn</button>
      </div> : null}
    </>
  )
}

export default CharacterList