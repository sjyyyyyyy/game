import { useState } from 'react';
import './App.css';
import Background from './componets/Background';
import UserForm from './componets/UserForm';
import UserList from './componets/UserList';
import { GameSate } from './utils/types';
function App() {
  const [gameState, setGameState] = useState(1)
  const [scrollWidth, setScrollWidth] = useState(document.body.scrollWidth)
  const [scrollHeight, setScrollHeight] = useState(document.body.scrollWidth / 2)
  window.onresize = ()=>{
    setScrollWidth(document.body.scrollWidth)
    setScrollHeight(document.body.scrollWidth / 2)
  }
  return (<>
    <div className='game-container'>
      <div className='user-login' style={{display:gameState === GameSate.notLogin ? "grid" : "none"}} >
        <UserForm gameState={gameState} setGameState={setGameState} />
        <UserList gameState={gameState} />
      </div>
      <Background  width={scrollWidth}  gameState={gameState} setGameState={setGameState}  height={scrollHeight} />
    </div>
  </>)
}

export default App;
