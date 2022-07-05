import { useState } from 'react'

import serviceLocator from '../Firebase/serviceLocator'

import '../Styles/CharacterList.css'

function Character({ character, showHeadings = false }) {
  const characterService = serviceLocator.services.characterService
  const [formData, setFormdata] = useState({
    ...character
  })

  function handleChange(event) {
    event.preventDefault()

    const type = event.target.type
    const name = event.target.name

    let value = event.target.value

    if (type === 'number') {
      value = parseInt(value)
      if (value < 0 && name !== 'healing') {
        value = 0
      }
    }

    setFormdata({
      ...formData,
      [name]: value
    })
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    characterService.addCharacter(formData.name, formData.initiativeModifier, formData.initiative, formData.maxHp, formData.currentHp, formData.isNPC, formData.isTurn)
  }

  return (
    <div>
      {(showHeadings) ?
        <li className='flex content-center justify-around p-5 py-2 border-b-4'>
          <h1 className='heading'>Name</h1>
          <h1 className='heading'>Health</h1>
          <h1 className='heading'>Initiative Modifier</h1>
          <h1 className='heading'>Initiative</h1>
        </li> :
        <form className={character.isTurn ? 'row border-2 rounded-lg border-green-400' : 'row'} onSubmit={handleSubmit}>
          <input className='field w-32' name='name' onChange={handleChange} value={formData.name} type='text' onBlur={handleSubmit}></input>
          <div className='flex content-center w-32 justify-center'>
            <input className='field w-10' name='currentHp' onChange={handleChange} value={formData.currentHp} type='text' onBlur={handleSubmit}></input>
            <h1 className='text-lg my-auto pr-2 text-center pl-1'>/</h1>
            <input className='field w-10' name='maxHp' onChange={handleChange} value={formData.maxHp} type='text' onBlur={handleSubmit}></input>
            <h1 className='text-lg my-auto pr-2 text-center'>hp</h1>
          </div>
          <div className='flex w-32 justify-center'>
            <h1 className='text-lg my-auto pr-2 text-center -mr-2'>+</h1>
            <input className='field w-10' name='initiativeModifier' onChange={handleChange} value={formData.initiativeModifier} type='number' onBlur={handleSubmit}></input>
          </div>
          <div className='flex w-32 justify-center'>
            <input className='field w-16' name='initiative' onChange={handleChange} value={formData.initiative} type='number' onBlur={handleChange}></input>
          </div>
        </form>
      }
    </div>
  )
}

export default Character