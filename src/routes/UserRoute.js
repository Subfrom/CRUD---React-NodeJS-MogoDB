import React from 'react'
import { useSelector } from 'react-redux'
import ResponsiveAppBar from '../layout/ResponsiveAppBar'
import Notfound from '../components/pages/Notfound'

const UserRoute = ({children}) => {
  const { user } = useSelector((state) => ({...state}))
  return 
    user && user.user.token ? 
    <>
    <ResponsiveAppBar />
    {children} 
    </>
    : <Notfound text="The page you’re looking for doesn’t exist." />
}

export default UserRoute