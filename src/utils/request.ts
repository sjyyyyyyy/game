import axios from "axios"
import { Respond } from "./types"

export function pushUserPoint(user:string, point:number):void{
    const getUrl = `http://order.80boys.com/pushUserPoint?username=${user}&point=${point}`
    axios.get(getUrl)
}

export async function getUserPoint():Promise<Respond>{
    const getUrl = "http://order.80boys.com/getUserPoint"
    const {data} = await axios.get(getUrl)
    return data
}