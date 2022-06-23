import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
    console.log(unsortedData)
    setCharacters(sortCharacters(unsortedData))
  }

  async function rollInitiative() {
    let data = characters.map(character => {
      if (character.isNPC) {
        return {
          ...character,
          isTurn: false,
          initiative: Math.floor(Math.random() * 20 + 1) + character.initiativeModifier
        }
      } else {
        return {
          ...character,
          isTurn: false
        }
      }
    })
    data = data.filter(a => a)
    const sortedData = sortCharacters(data)
    sortedData[0].isTurn = true
    updateDatabase(sortedData)
    setCharacters(sortedData)
  }

  function sortCharacters(data) {
    let sortedData = data
    if (!name) {
      sortedData = data.sort((a, b) => {
        if (b.initiative < a.initiative) {
          return -1
        } else {
          return 1
        }
      })
    }
    return sortedData
  }

  function updateDatabase(data) {
    data.forEach(character => {
      characterService.addCharacter(character.name, character.initiativeModifier, character.initiative, character.maxHp, character.currentHp, character.isNPC, character.isTurn)
    })
  }

  function nextTurn() {
    let turnIndex = 0
    for (let index in characters) {
      if (characters[index].isTurn) {
        turnIndex = parseInt(index)
      }
    }
    let nextIndex = parseInt(turnIndex) + 1
    if (turnIndex === characters.length - 1) {
      nextIndex = 0
    }
    characters[turnIndex].isTurn = false
    characters[nextIndex].isTurn = true
    updateDatabase([characters[turnIndex], characters[nextIndex]])
  }

  return (
    <>
      <div className='card'>
        <ul className=''>
          <Character showHeadings={true}></Character>
          {(characters === null) ? null : characters.map(character => {
            return <Character key={Math.random()} character={character}></Character>
          })}
        </ul>
      </div>
      <div className='flex m-10'>
        <Link to='/' className='btn btn-success-filled'>Home</Link>
        {(name === undefined) ? <div className='flex'>
          <button className='btn btn-success-filled ml-3' onClick={rollInitiative}>Roll initiative</button>
          <button className='btn btn-success-filled ml-3' onClick={nextTurn}>Next turn</button>
        </div> : null}
      </div>
    </>
  )
}

export default CharacterList