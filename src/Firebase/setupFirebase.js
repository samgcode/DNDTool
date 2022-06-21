import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  databaseURL: 'https://dndtool-ba924-default-rtdb.firebaseio.com/'
}

const app = initializeApp(firebaseConfig)

export default getDatabase(app)