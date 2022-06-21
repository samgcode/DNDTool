const { set, ref } = require("firebase/database")

class CharacterService {
  constructor(serviceLocator) {
    this.db = serviceLocator.database
  }

  addCharacter(name, initiativeModifier, initiative, maxHp, currentHp, isNPC) {
    set(ref(this.db, `characters/${name}`), {
      name,
      initiativeModifier,
      initiative,
      maxHp,
      currentHp,
      isNPC
    })
  }
}

export default CharacterService