import React from 'react'

const FetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json();
    console.log('data', data);
    return (
        <>
            <div>FetchData</div>
            {data.map((user:any)=>{
                return <p>{user.name}</p>
            })}
        </>
    )
}

export default FetchData