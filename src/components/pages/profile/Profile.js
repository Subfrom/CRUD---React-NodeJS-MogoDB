import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

    const { user } = useSelector((state) => ({ ...state }))
    
    const [form, setForm] = useState({
        email: "",
        username: "",
        id: "",
    });

    useEffect(() => {
        setForm({
            email: user.user.email,
            username: user.user.username,
            id: user.user.id,
        });
    }, [user]);

    return (
       <div className='container'>
            <div className='row'>
                <div className='card mt-5'>
                    <div className='card-body'>
                        <h4 className='card-title'>Profile</h4>
                        <p className='card-text'>Email: {user.user.email}</p>
                        <p className='card-text'>Username: {user.user.username}</p>
                        <p className='card-text'>Role: {user.user.role}</p>
                        <a href='/profile/edit' className='btn btn-primary'>Edit Profile</a>
                    </div>
                </div>
            </div>
       </div>
    )
}

export default Profile