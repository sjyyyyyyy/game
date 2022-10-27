import Jlbin from "../img/jl.png"
import wallimg from "../img/wall.png"
import { VARTYPE } from "./types"
const VAR:VARTYPE = {
    img : new Image(),
    jl : new Image(),
    wall : new Image(),
    canvas: null,
    canvas1 : null,
    canvas2 : null,
    step : 5,
    rate : 0,
    maxCount : 0,
    minCount : 0,
    jumpHeight : 0,
    baseJumpHeight : 276,
    startUp : false,
    count : 0,
    wallCount : 0,
    frame : 20 ,
    lock : false,
    ctx : null,
    ctx1 : null,
    ctx2 : null 
}
VAR.wall.src = wallimg
VAR.jl.src = Jlbin
export default VAR