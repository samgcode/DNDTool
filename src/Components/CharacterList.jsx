import { useEffect, useState } from "react"

import serviceLocator from "../Firebase/serviceLocator"

function CharacterList() {
  const characterService = serviceLocator.services.characterService
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    characterService.callback = (data) => {
      setCharacters(data)
    }
  }, [])

  return (
    <div className="test">
      {(characters === null) ? null : characters.map(character => {
        return <div key={character.name}>{character.name} {character.initiative} {character.maxHp}</div>
      })}
    </div>
  )
}

export default CharacterList