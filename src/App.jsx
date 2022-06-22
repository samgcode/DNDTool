import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Admin from './Pages/Admin'
import Player from './Pages/Player'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/player' element={<Player/>}>
            <Route path=':name' element={<Player/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App

/*
character {
  name
  initiative
  hp
  npc
}
*/