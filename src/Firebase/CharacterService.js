const { set, ref, onValue, get, child } = require("firebase/database")

class CharacterService {
  constructor(serviceLocator) {
    this.db = serviceLocator.database
    this.callback = (data) => { console.log(data); }
    onValue(ref(this.db, 'characters/'), snapshot => { this.handleCalback(snapshot) })
  }

  addCharacter(name, initiativeModifier, initiative, maxHp, currentHp, isNPC, isTurn) {
    set(ref(this.db, `characters/${name}`), {
      name,
      initiativeModifier,
      initiative,
      maxHp,
      currentHp,
      isNPC,
      isTurn
    })
  }

  async getCharacters(name) {
    let data
    try {
      const snapshot = await get(child(ref(this.db), `characters/${name}`))
      if (snapshot.exists()) {
        data = snapshot.val()
      } else {
        console.log("No data available")
      }
    } catch (error) {
      console.error(error)
    }
    return this.convertJsonToArray(data)
  }

  handleCalback(snapshot) {
    this.callback(this.convertJsonToArray(snapshot.val()))
  }

  convertJsonToArray(json) {
    let data = []
    for (let i in json) {
      data.push(json[i])
    }

    return data
  }
}

export default CharacterService