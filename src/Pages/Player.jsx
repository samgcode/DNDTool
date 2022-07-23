import { useParams } from 'react-router-dom'

import CharacterList from '../Components/CharacterList'
import PlayerForm from '../Components/PlayerForm'

function Player() {
  const routeParams = useParams()

  return (
    <div>
      <CharacterList name={routeParams.name}></CharacterList>
      <PlayerForm name={routeParams.name}></PlayerForm>
    </div>
  )
}

export default Player
