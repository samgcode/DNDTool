

function Character({ character }) {

  return (
    <li className='flex content-center justify-around p-5' key={character.name}>
      <h1 className='text-lg my-auto pr-2 w-10'>{character.name}</h1>
      <h1 className='text-lg my-auto pr-2 w-10'>{character.currentHp}/{character.maxHp}</h1>
      <h1 className='text-lg my-auto pr-2 w-10'>{character.initiative}</h1>
      <h1 className='text-lg my-auto pr-2 w-10'>{character.isNPC ? 'npc' : 'player'}</h1>
    </li>
  )
}

export default Character