import '../Styles/CharacterList.css'

function Character({ character, showHeadings = false }) {

  return (
    <div>
      {(showHeadings) ?
        <li className='flex content-center justify-around p-5 py-2 border-b-4'>
          <h1 className='heading'>Name</h1>
          <h1 className='heading'>Health</h1>
          <h1 className='heading'>Initiative Modifier</h1>
          <h1 className='heading'>Initiative</h1>
        </li> :
        <li className={character.isTurn ? 'row border-2 rounded-lg border-green-400' : 'row'}>
          <h1 className='heading'>{character.name}</h1>
          <h1 className='heading'>{character.currentHp}/{character.maxHp} hp</h1>
          <h1 className='heading'>+{character.initiativeModifier}</h1>
          <h1 className='heading'>{character.initiative}</h1>
        </li>
      }
    </div>
  )
}

export default Character