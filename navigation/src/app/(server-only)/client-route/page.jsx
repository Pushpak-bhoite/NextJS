// "use client"


import { serverSideFunnction } from "@/app/utils/server-utils"

export default function page() {
    console.log(serverSideFunnction(),'---> client-route') 
    let result = serverSideFunnction()

    return (
        <div>
            <h2> Client side</h2>
            <h1>{result}</h1>
        </div>
    )
}