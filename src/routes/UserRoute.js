import React from 'react'
import { useSelector } from 'react-redux'

const UserRoute = ({children}) => {
  const { user } = useSelector((state) => ({...state}))
  return (
    user && user.user.token ? children : <h1>Access Denied</h1>
  )
}

export default UserRoute