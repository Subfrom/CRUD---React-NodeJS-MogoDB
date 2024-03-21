import React from 'react'
import { useSelector } from 'react-redux'
import ResponsiveAppBar from '../layout/ResponsiveAppBar'
import Notfound from '../components/pages/Notfound'

const UserRoute = ({children}) => {
  const { user } = useSelector((state) => ({...state}))
  
  return user && user.user.token ? (
    <div>
      <ResponsiveAppBar />
      <div>
        {children}
      </div>
    </div>
  ) : <Notfound text="No Permission"/>
}

export default UserRoute