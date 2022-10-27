import { memo, useCallback, useEffect, useState } from "react"
import { GameSate } from "../utils/types"
import "./UserForm.css"
const UserForm = memo((props:any) =>{
    console.log("UserForm 渲染了")
    const [userInput, setUserInput] = useState(sessionStorage.getItem("username"))
    useEffect(()=>{
        if ( userInput !== "" && userInput !== null ) {
            props.setGameState(GameSate.again)
        }
    }, [])
    const startGame = ()=>{
        if ( userInput !== "" && userInput !== null ) {
            sessionStorage.setItem("username", userInput)
            props.setGameState(GameSate.running)
        }
    }
    return (<>
        <div className='user-input-container'>
            <div className="user-input-center">
                <div>输入昵称即可开始游戏</div>
                昵称：
                <input type="text" onChange={(e)=>{
                    setUserInput((s)=>{
                        return e.target.value
                    })
                }} />
                <button onClick={startGame}>开始游戏</button>
            </div>
        </div>
    </>)
})
export default UserForm