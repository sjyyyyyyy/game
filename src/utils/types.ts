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