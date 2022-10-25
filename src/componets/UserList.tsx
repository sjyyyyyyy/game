import { useCallback, useMemo, useState } from "react"
import { getUserPoint } from "../utils/request"
import { GameSate } from "../utils/types"
import "./UserList.css"
function UserList(props:{
      gameState:GameSate
}){
    const [userList, setUserList] = useState([{username:"",id:0,point:0}])
    useMemo(()=>{
      if ( props.gameState !== GameSate.running ) {
        getUserPoint().then((e)=>{
          if ( e.status === 200 ) {
            setUserList(e.data)
          }
        })
      }
    }, [props.gameState])
    return (
        <div style={{overflow: "hidden"}}>
            <ul className="userlist">
              <li>排行榜前十名</li>
              {
                userList.map((r)=>{
                return <li key={r.id}>昵称：{r.username} 分数： {r.point}</li>
                })
              }
            </ul>
        </div>
    )
}
export default UserList