
import { serverSideFunnction } from "@/app/utils/server-utils"

export default function page (){
    console.log(serverSideFunnction(),'---> server-route')
    let result = serverSideFunnction()

    return (
        <div>
            <h2> Server side</h2>
            <h1>{result}</h1>
        </div>
    )
}