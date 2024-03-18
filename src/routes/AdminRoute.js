import React,{ useEffect,useState } from 'react'
import SideBar from '../layout/SideBar';
import HeaderBar from '../layout/HeaderBar';
import { Box } from '@mui/material';
import { Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentAdmin } from "../functions/auth";
import Notfound from '../components/pages/Notfound';

const AdminRoute = ({children}) => {
  const { user } = useSelector((state) => ({...state}));
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if(user && user.user.token)
    {
      currentAdmin(user.user.token).then(res => {
        setAdmin(true);
      }).catch(err => {
        console.log(err);
        setAdmin(false);
      });
    }
  }, [user]);

  const text = "No Permission";

  return admin ? (
    <div className="app">
      <SideBar />
      <main className="content">
        <HeaderBar />
        <div className="content_body">
          <Box m="20px">
                {children}
          </Box>
        </div>
      </main>
    </div>
  ) : <Notfound text={text}/>
}

export default AdminRoute