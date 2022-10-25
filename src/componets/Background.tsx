import React, { RefObject, useEffect, useState } from "react"
import { Bjprops, GameSate } from "../utils/types"
import imgbin from "../img/map.png"
import justmp3 from "../audio/just.mp3"
import fail from "../audio/fail.mp3"
import happtroll from "../audio/happtroll.mp3"
import "./Background.css"
import Player from "../utils/Player"
import { pushUserPoint } from "../utils/request"
import VAR from "../utils/GlobalData"
import UserList from "./UserList"
import FailGame from "./FailGame"
function Background(props:Bjprops){
    const [point, setPoint] = useState(0)
    const container:RefObject<HTMLDivElement> = React.createRef()
    useEffect(()=>{
        if ( container.current !== null ) {
            container.current.append(VAR.canvas)
            container.current.append(VAR.canvas1)
            container.current.append(VAR.canvas2)
            VAR.img.src = imgbin
            VAR.img.onload  = ()=>{
                VAR.canvas.width = props.width
                VAR.canvas.height = props.height
                VAR.canvas1.width = props.width
                VAR.canvas1.height = props.height
                VAR.canvas2.width = props.width
                VAR.canvas2.height = props.height
                VAR.rate = VAR.img.height / props.height
                VAR.maxCount = Math.floor( VAR.img.width / VAR.step )
                VAR.minCount = Math.floor( (VAR.img.width - props.width * VAR.rate ) / VAR.step )
                VAR.jumpHeight =VAR. baseJumpHeight
                drawBj( VAR.step, 0 )
                VAR.startUp = true
            }
            return ()=>{}
        }
    }, [props.width])
    const run = ( num: number = 0)=>{
        if ( num >= VAR.maxCount ) {
            num = 0
        }
        setTimeout(()=>{
            if ( VAR.startUp === true ) {
                drawBj( VAR.step * num, num )
                drawJl()
                drawWall()
                if ( num < VAR.maxCount ) {
                    run(num+1)
                } 
            }
        }, 10)
    }
    const drawWall = ()=>{
        if ( (VAR.wallCount * VAR.step / VAR.rate) - (80 / VAR.rate) > props.width ) {
            VAR.wallCount = 0
        }
        VAR.step= VAR.step+0.001
        
        setPoint((point)=>{
            return point+1
        })

        VAR.wallCount++
        const wallX = VAR.wallCount * VAR.step * -1  / VAR.rate + props.width
        const wallw = 80 / VAR.rate
        const jlw = 80 / VAR.rate
        const jlx = 30 / VAR.rate
        VAR.ctx1?.clearRect(0,0, props.width, props.height )
        VAR.ctx1?.drawImage(VAR.wall, 
            360, 0, 
            200, 130,
            (VAR.wallCount * VAR.step * -1 / VAR.rate + props.width), 256 / VAR.rate,
            200 / VAR.rate, 130 / VAR.rate
        )
        if ( wallX < jlx + jlw && wallX + wallw > jlx )  {
            if ( VAR.jumpHeight / VAR.rate > 256 / VAR.rate ) {
                VAR.wallCount = 0
                VAR.startUp = false
                Player.getInstance(happtroll).pause()
                Player.getInstance(fail).play()
                setPoint((point)=>{
                    const user = sessionStorage.getItem("username")
                    if ( user !== null )
                        pushUserPoint(user, point)
                    return point
                })
                props.setGameState(GameSate.fail)
            }
        }
    }
    const drawJl =()=>{
        VAR.ctx2?.clearRect(0,0, props.width, props.height )
        if ( VAR.count < VAR.frame ) {
            VAR.ctx2?.drawImage(VAR.jl, 
                102, 0, 
                102 , 118,
                30 / VAR.rate,  VAR.jumpHeight / VAR.rate,
                102 / VAR.rate, 118 / VAR.rate
            ) 
        }
        if ( VAR.count > VAR.frame ) {
            VAR.ctx2?.drawImage(VAR.jl, 
                110, 235, 
                102 , 118,
                48 / VAR.rate,  VAR.jumpHeight / VAR.rate,
                102 / VAR.rate, 118 / VAR.rate
            ) 
        }
        VAR.count++
        if ( VAR.count > VAR.frame * 2 ) {
            VAR.count = 0
        }
    }
    const drawBj =(stepBj:number, num:number)=>{
        VAR.ctx?.drawImage(VAR.img, 
            stepBj, 0, 
            props.width  * VAR.rate , VAR.img.height,

            0, 0,
            props.width, props.height
        )
        if ( num >= VAR.minCount ) {
            VAR.ctx?.drawImage(VAR.img, 
                0, 0, 
                ( num - VAR.minCount ) * VAR.step,  VAR.img.height,

                props.width - ((( num - VAR.minCount ) * VAR.step) / VAR.rate) , 0,
                ((( num - VAR.minCount ) * VAR.step) / VAR.rate ),   props.height
            )
        }
    }
    useEffect(()=>{
        if  ( props.gameState  === GameSate.running ) {
            VAR.startUp = true
            setPoint(0)
            VAR.step = 5
            run(0)
            try {
                Player.getInstance(happtroll, true).play();
            } catch (error) {}
        }
        window.onkeydown = (e)=>{
            if  ( props.gameState  === GameSate.again || props.gameState  === GameSate.fail ) {
                props.setGameState(GameSate.running)  
            } else if ( props.gameState === GameSate.running ) {
                if ( VAR.lock === false ) {
                    VAR.lock = true
                    Player.getInstance(justmp3).play();
                    jump()
                }
            }
        }
        window.document.ontouchstart = (e)=>{
            if  ( props.gameState  === GameSate.again || props.gameState  === GameSate.fail ) {
                props.setGameState(0)  
            } else if ( props.gameState === GameSate.running ) {
                if ( VAR.lock === false ) {
                    VAR.lock = true
                    Player.getInstance(justmp3).play();
                    jump()
                }
            }
        }
    }, [props.gameState])
    
    const jump =(isUp:boolean = true, jumpStep:number = 10)=>{
        if ( VAR.jumpHeight < 20 && isUp === true ) {
            isUp = false
        }
        if ( isUp === true ) {
            VAR.jumpHeight = VAR.jumpHeight - jumpStep
            jumpStep = jumpStep-0.15
        } else {
            VAR.jumpHeight = VAR.jumpHeight + jumpStep
            jumpStep = jumpStep+0.15
        }
        if ( jumpStep < 0 ) {
            jumpStep = 0
        }
        if ( VAR.jumpHeight >= VAR.baseJumpHeight && isUp === false ) {
            VAR.jumpHeight = VAR.baseJumpHeight
            VAR.lock = false
            return 
        }
        setTimeout(()=>{
            jump(isUp, jumpStep)
        }, 12)
    }
    return (
        <div className="game-background" 
        style={{width:props.width + "px", height: props.height + "px" }} ref={container}>
        <div style={{display: props.gameState !== GameSate.running ? 'block' : 'none' }} className="masklayer"></div>
        <span style={{display: props.gameState === GameSate.again ? 'inline-block'  : 'none' }} >敲击空格开始游戏</span>
        <div style={{display: props.gameState === GameSate.fail ? 'grid'  : 'none' }} className="game-fail" >
            <FailGame />
            <UserList gameState={props.gameState} />
        </div>
        <span className="point">{point}分</span>
    </div>
    )
}
export default Background