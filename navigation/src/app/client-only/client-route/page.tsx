"use client"
import { clientSideFunction } from '@/app/utils/client-utils';
import React from 'react';

const ClientRoute = () => {
 const result =  clientSideFunction()
 console.log('result-->', result)
  return (
    <div>page -> {result}</div>
  );
};

export default ClientRoute;

