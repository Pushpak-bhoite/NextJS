'use client'

import React, { useEffect } from "react";

export default function LoadingPage({error}: {error:Error}){

    useEffect(()=>{
        console.log('error-->',error)
    },[error])
    return (
        <h2>Error </h2>
    )
}