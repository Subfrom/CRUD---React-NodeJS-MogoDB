import React from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../store/userSlice'

const TestRedux2 = () => {

    const dispatch = useDispatch()


  return (
    <div>TestRedux2
        <button onClick={() => dispatch(login())}>Click me</button>
        <button onClick={() => dispatch(logout())}>Click me</button>
    </div>
  )
}

export default TestRedux2