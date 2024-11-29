'use client'
import { LogOut } from 'lucide-react'
import React from 'react'
import { signOut } from 'next-auth/react'

const page = () => {
    function hello(){
        signOut()
        console.log('called') 
    }
    return (
        <div>
            <button onClick={()=>hello()}>
                signout
            <LogOut />
            </button>
            
        </div>
    )
}

export default page