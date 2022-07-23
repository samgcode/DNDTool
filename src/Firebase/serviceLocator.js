import database from './setupFirebase'
import CharacterService from './CharacterService'

const serviceLocator = {
  database,
  services: {}
}

serviceLocator.services['characterService'] = new CharacterService(serviceLocator)

export default serviceLocator
