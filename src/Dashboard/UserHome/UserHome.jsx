import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';


const UserHome = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <h1 className='text-2xl font-semibold'>Hi, Welcome {user?.displayName ? user.displayName : 'back'}</h1>
        </div>
    );
};

export default UserHome;