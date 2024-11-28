import { clientSideFunction } from '@/app/utils/client-utils';
import React from 'react';

const ServerRoute = () => {
 const result =  ServerSideFunction()
 console.log('result-->', result)
  return (
    <div>page -> {result}</div>
  );
};

export default ServerRoute;
