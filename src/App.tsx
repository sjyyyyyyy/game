import { useState } from 'react';
import './App.css';
import Bj from './componets/Bj';

let username:string | null = sessionStorage.getItem("username")

function App() {

  const [isLogin, setLogin] = useState(1)
  const [userInput, setUserInput] = useState("")


  return (<>
    <div className='gamelogin'>
      <div className='login' style={{display:isLogin === 1?"block":"none"}} >
        <span>本游戏输入用户名后才可以开始游戏</span> <br />
        请输入您的用户名：
        <input type="text" value={userInput} onChange={(e)=>{
          setUserInput((s)=>{
            return e.target.value
          })
        }} />
        <button onClick={()=>{
          if ( userInput !== "" ) {
            sessionStorage.setItem("username", userInput)
            setLogin(0)
          }
        }}>开始游戏</button>
      </div>
      <Bj  width={document.body.scrollWidth - 20}  isStart={isLogin}  height={document.body.scrollWidth / 3} />
    </div>
  </>)
}

export default App;
