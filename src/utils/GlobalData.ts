import Jlbin from "../img/jl.png"
import wallimg from "../img/wall.png"
const VAR = {
    img : new Image(),
    jl : new Image(),
    wall : new Image(),
    canvas : document.createElement("canvas"),
    canvas1 : document.createElement("canvas"),
    canvas2 : document.createElement("canvas"),
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
    ctx : document.createElement("canvas").getContext("2d"),
    ctx1 : document.createElement("canvas").getContext("2d"),
    ctx2 : document.createElement("canvas").getContext("2d") 
}
VAR.wall.src = wallimg
VAR.jl.src = Jlbin
VAR.ctx = VAR.canvas.getContext("2d")
VAR.ctx1 = VAR.canvas1.getContext("2d")
VAR.ctx2 = VAR.canvas2.getContext("2d")
export default VAR