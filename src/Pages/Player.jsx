import { useParams } from 'react-router-dom'

import CharacterList from '../Components/CharacterList'

function Player() {
  const routeParams = useParams()

  return (
    <div>
      <CharacterList name={routeParams.name}></CharacterList>
    </div>
  )
}

export default Player