export type VARTYPE = {
    img : HTMLImageElement,
    jl : HTMLImageElement,
    wall : HTMLImageElement,
    canvas: HTMLCanvasElement | null,
    canvas1 : HTMLCanvasElement | null,
    canvas2 : HTMLCanvasElement | null,
    step : number,
    rate : number,
    maxCount : number,
    minCount : number,
    jumpHeight : number,
    baseJumpHeight : number,
    startUp : boolean,
    count : number,
    wallCount : number,
    frame : number,
    lock : boolean,
    ctx : CanvasRenderingContext2D | null | undefined, 
    ctx1 : CanvasRenderingContext2D | null| undefined,
    ctx2 : CanvasRenderingContext2D | null| undefined
}
export type Bjprops = {
    width: number,
    height: number,
    gameState: number,
    setGameState: (num:number)=>void
}
export type UserList = {
    username: string, 
    point: number,
    id:number
}
export type Respond = {
    status: number, 
    message: string, 
    data : [UserList]
}
export enum GameSate {
    running=0,
    notLogin=1,
    fail=2,
    again=3
}