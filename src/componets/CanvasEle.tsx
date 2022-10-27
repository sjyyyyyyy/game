import React, { RefObject, useEffect } from "react"
import { memo } from "react"

const CanvasEle = memo((props:{
    width:number, 
    height:number,
    reRender:(canvas1: React.RefObject<HTMLCanvasElement>, canvas2: React.RefObject<HTMLCanvasElement>, canvas3: React.RefObject<HTMLCanvasElement>)=>void;
})=>{
    const canvas1:RefObject<HTMLCanvasElement> = React.createRef()
    const canvas2:RefObject<HTMLCanvasElement> = React.createRef()
    const canvas3:RefObject<HTMLCanvasElement> = React.createRef()
    useEffect(()=>{
        props.reRender(canvas1, canvas2, canvas3)
    }, [])
    return (
        <>
            <canvas ref={canvas1} width={props.width} height={props.height} />
            <canvas ref={canvas2} width={props.width} height={props.height} />
            <canvas ref={canvas3} width={props.width} height={props.height} />
        </>
    )
})
export default CanvasEle
