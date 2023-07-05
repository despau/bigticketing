import React, { useState, useEffect } from 'react'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signout = () => {

  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });


  useEffect(() =>{
    doRequest();
  }, []);


  return (
    <h1>Signing you Out...</h1>
  )
}

export default Signout