import { useEffect, useState } from 'react'

import serviceLocator from '../Firebase/serviceLocator'

function PlayerForm({ name }) {
  const characterService = serviceLocator.services.characterService
  const [formData, setFormdata] = useState({
    name: '',
    initiative: '',
    initiativeModifier: '',
    healing: ''
  })

  useEffect(() => {
    getCharacter()
  }, [])
  
  async function getCharacter() {
    const character = await characterService.getCharacters(name)
    setFormdata({...character[0], healing: ''})
  }

  function handleChange(event) {
    event.preventDefault()

    const type = event.target.type
    const name = event.target.name

    let value = type === 'checkbox' ? event.target.checked : event.target.value

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
    let health = parseInt(formData.currentHp)+formData.healing
    if(health > formData.maxHp) {
      health = formData.maxHp
    }
    if(health < 0) {
      health = 0
    }
    characterService.addCharacter(formData.name, formData.initiativeModifier, formData.initiative, formData.maxHp, health, formData.isNPC, false)
    getCharacter()
  }

  return (
    <div>
      <form className='card' onSubmit={handleSubmit}>
        <div className='flex content-center p-5'>
          <h1 className='text-lg my-auto pr-2'>Name:</h1>
          <input className='my-auto input' name='name' value={formData.name}readOnly></input>
          <h1 className='text-lg my-auto px-2'>Initiative mod:</h1>
          <input className='my-auto input w-12' name='initiativeModifier' value={formData.initiativeModifier} onChange={handleChange} placeholder='Initiative modifier' type='number'></input>
          <h1 className='text-lg my-auto px-2' >Initiative:</h1>
          <input className='my-auto input w-14' name='initiative' value={formData.initiative} onChange={handleChange} placeholder='Initiative' type='number'></input>
          <h1 className='text-lg my-auto px-2' >Healing:</h1>
          <input className='my-auto input' name='healing' value={formData.healing} onChange={handleChange} placeholder='Change in health' type='number'></input>
          <button className='btn btn-success my-auto ml-10'>Update</button>
        </div>
      </form>
    </div>
  );
}

export default PlayerForm