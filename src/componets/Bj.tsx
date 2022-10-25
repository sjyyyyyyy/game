import React, { RefObject, useEffect, useState } from "react"
import { Bjprops } from "../utils/types"
import imgbin from "../img/map.png"
import Jlbin from "../img/jl.png"
import wallimg from "../img/wall.png"
import moon from "../audio/moon.mp3"
import justmp3 from "../audio/just.mp3"
import fail from "../audio/fail.mp3"
import happtroll from "../audio/happtroll.mp3"
import "./Bj.css"
import Player from "../utils/Player"
const img = new Image()
const jl = new Image()
const wall = new Image()
wall.src = wallimg
jl.src = Jlbin
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
const canvas1 = document.createElement("canvas")
const ctx1 = canvas1.getContext("2d")
const canvas2 = document.createElement("canvas")
const ctx2 = canvas2.getContext("2d")
let step = 5
let rate = 0
let maxCount = 0
let minCount = 0
let jumpHeight = 0
let baseJumpHeight = 276
let startUp = false
let count = 0
let wallCount = 0
const frame = 20
let lock = false
function Bj(props:Bjprops){
    const [point, setPoint] = useState(0)
    const container:RefObject<HTMLDivElement> = React.createRef()
    useEffect(()=>{
        if ( container.current !== null ) {
            container.current.append(canvas)
            container.current.append(canvas1)
            container.current.append(canvas2)
            img.src = imgbin
            img.onload  = ()=>{
                canvas.width = props.width
                canvas.height = props.height
                canvas1.width = props.width
                canvas1.height = props.height
                canvas2.width = props.width
                canvas2.height = props.height
                rate = img.height / props.height
                maxCount = Math.floor( img.width / step )
                minCount = Math.floor( (img.width - props.width * rate ) / step )
                jumpHeight = baseJumpHeight
                drawBj( step, 0 )
                startUp = true
            }
            return ()=>{
                
            }
        }
    }, [props.width])
    const run = ( num: number = 0)=>{
        if ( num >= maxCount ) {
            num = 0
        }
        setTimeout(()=>{
            if ( startUp === true ) {
                drawBj( step * num, num )
                drawJl()
                drawWall()
                if ( num < maxCount ) {
                    run(num+1)
                } 
            }
        }, 10)
    }
    const drawWall = ()=>{
        if ( (wallCount * step / rate) - (80 / rate) > props.width ) {
            wallCount = 0
        }
        step= step+0.001
        setPoint((point)=>{
            return point+1
        })
        wallCount++
        const wallX = wallCount * step * -1  / rate + props.width
        const wallw = 80 / rate
        const jlw = 80 / rate
        const jlx = 30 / rate
        ctx1?.clearRect(0,0, props.width, props.height )
        ctx1?.drawImage(wall, 
            360, 0, 
            200, 130,
            (wallCount * step * -1 / rate + props.width), 256 / rate,
            200 / rate, 130 / rate
        )
        if ( wallX < jlx + jlw && wallX + wallw > jlx )  {
            if ( jumpHeight / rate > 256 / rate ) {
                wallCount = 0
                startUp = false
                Player.getInstance(happtroll).pause();
                Player.getInstance(fail).play();
            }
        }
    }
    const drawJl =()=>{
        ctx2?.clearRect(0,0, props.width, props.height )
        if ( count < frame ) {
            ctx2?.drawImage(jl, 
                102, 0, 
                102 , 118,
                30 / rate,  jumpHeight / rate,
                102 / rate, 118 / rate
            ) 
        }
        if ( count > frame ) {
            ctx2?.drawImage(jl, 
                110, 235, 
                102 , 118,
                48 / rate,  jumpHeight / rate,
                102 / rate, 118 / rate
            ) 
        }
        count++
        if ( count > frame * 2 ) {
            count = 0
        }
    }
    const drawBj =(stepBj:number, num:number)=>{
        ctx?.drawImage(img, 
            stepBj, 0, 
            props.width  * rate , img.height,

            0, 0,
            props.width, props.height
        )
        if ( num >= minCount ) {
            ctx?.drawImage(img, 
                0, 0, 
                ( num - minCount ) * step,  img.height,

                props.width - ((( num - minCount ) * step) / rate) , 0,
                ((( num - minCount ) * step) / rate ),   props.height
            )
        }
    }
    useEffect(()=>{
        if ( props.isStart > 0 ) {
            startUp = true
            setPoint(0)
            step = 5
        }
        if  ( props.isStart  === 0 ) {
            run(0)
            Player.getInstance(happtroll, true).play();
        }
        window.onkeydown = (e)=>{
            if ( e.keyCode === 32  ) {
                if ( lock === false ) {
                    lock = true
                    Player.getInstance(justmp3).play();
                    jump()
                }
            }
        }
    }, [props.isStart])
    
    const jump =(isUp:boolean = true, jumpStep:number = 10)=>{
        if ( jumpHeight < 20 && isUp === true ) {
            isUp = false
        }
        if ( isUp === true ) {
            jumpHeight = jumpHeight - jumpStep
            jumpStep = jumpStep-0.15
        } else {
            jumpHeight = jumpHeight + jumpStep
            jumpStep = jumpStep+0.15
        }
        if ( jumpStep < 0 ) {
            jumpStep = 0
        }
        if ( jumpHeight >= baseJumpHeight && isUp === false ) {
            jumpHeight = baseJumpHeight
            lock = false
            return 
        }
        setTimeout(()=>{
            jump(isUp, jumpStep)
        }, 12)
    }
    return (
        <div className="bj" 
        style={{width:props.width + "px", height: props.height + "px" }} ref={container}>
        <div style={{display: props.isStart > 0 ? 'block' : 'none' }} className="masklayer"></div>
        <span style={{display: props.isStart === 1 ? 'inline-block'  : 'none' }} ></span>
        <span style={{display: props.isStart === 2 ? 'inline-block'  : 'none' }} >游戏失败了！点击键盘重新开始</span>
        <span className="point">{point}</span>
    </div>
    )
}
export default Bj