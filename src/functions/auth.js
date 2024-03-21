import axios from 'axios'

export const register = async (form) => 
    await axios.post(process.env.REACT_APP_API + '/register', form)

export const login = async (form) => 
    await axios.post(process.env.REACT_APP_API + '/login', form)

export const loginLing = async (form) => 
    await axios.post(process.env.REACT_APP_API + '/loginline', form)

export const currentUser = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + "/currentUser",
    {},
    { headers: { authtoken } }
  );

export const currentAdmin = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + "/currentAdmin",
    {},
    { headers: { authtoken } }
  );
