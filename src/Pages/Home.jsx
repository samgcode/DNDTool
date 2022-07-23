import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import serviceLocator from '../Firebase/serviceLocator'

function Home() {
  const characterService = serviceLocator.services.characterService
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    async function getCharacters() {
      try {
        const data = await characterService.getCharacters()
        setCharacters(data.filter(character => {
          return !character.isNPC
        }))
      } catch (error) {
        console.error(error)
      }
    }
    getCharacters()
  }, [])

  return (
    <div>
      <ul className='w-full flex justify-center pt-24'>
        {(characters === null) ? null : characters.map((character) => {
          return <li key={character.name}>
            <Link to={`/player/${character.name}`}>
              <button className='btn mx-1'>{character.name}</button>
            </Link>
          </li>
        })}
      </ul>
      <div className='w-full flex justify-center pt-2'>
        <Link to='/admin'>
          <button className='btn btn-success mx-1'>Admin</button>
        </Link>
        <a href='https://github.com/samgcode/DNDTool' className='btn btn-success mx-1'>Source Code</a>
      </div>
    </div>
  )
}

export default Home
