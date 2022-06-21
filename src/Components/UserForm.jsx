import { useState } from "react"

function UserForm() {
  const [formData, setFormdata] = useState({
  name: '',
    initiative: '',
    hp: '',
    isNpc: false
  })

  function handleChange(event) {
    event.preventDefault()

    const type = event.target.type
    const name = event.target.name
    
    let value = type === 'checkbox' ? event.target.checked : event.target.value
    
    if(type === 'number') {
      value = parseInt(value)
      if(value < 0) {
        value = 0
      }
    }

    setFormdata({
      ...formData,
      [name]: value
    })
    console.log(formData)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)
  }

  return (
    <div>
      <form className='card m-10 border' onSubmit={handleSubmit}>
        <div className='flex content-center p-5'>
          <h1 className='text-lg my-auto pr-2'>Name:</h1>
          <input className='my-auto' name='name' value={formData.name} onChange={handleChange} placeholder='Name'></input>
          <h1 className='text-lg my-auto px-2'>Initiative:</h1>
          <input className='my-auto' name='initiative' value={formData.initiative} onChange={handleChange} placeholder='Initiative modifier' type='number'></input>
          <h1 className='text-lg my-auto px-2' >HP:</h1>
          <input className='my-auto' name='hp' value={formData.hp} onChange={handleChange} placeholder='Maximum HP' type='number'></input>
          <h1 className='text-lg my-auto px-2'>Is npc:</h1>
          <input className='my-auto' name='isNpc' checked={formData.isNpc} onChange={handleChange} key={Math.random()} type="checkbox"></input>
          <button className='btn btn-success my-auto ml-10'>Add</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm

/*
character {
  name
  initiative
  hp
  npc
}
*/