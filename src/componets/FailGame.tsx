import { memo } from "react"
import "./FailGame.css"
const FailGame = memo(( props:any )=>{
    console.log("FailGame 渲染了")
    return (<>
        <div>
            <div  className="fail-game-text">游戏失败了！点击屏幕或者键盘重新开始</div>
        </div>
    </>)
})
export default FailGame