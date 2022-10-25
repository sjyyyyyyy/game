class Player{
    private static stans = new Map()
    public static getInstance( flag:string = "", loop:boolean = false ){
        if ( !Player.stans.has( flag ) ) {
            const audio = new Audio()
            audio.src = flag
            audio.loop = loop
            audio.volume = 0.1
            Player.stans.set( flag , audio )
        }
        return Player.stans.get(flag)
    }
    private constructor (){} 
}
export default Player