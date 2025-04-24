import React,{ useEffect, useState } from 'react';

import './User.css';
import UserList from "../users-components/UserList";
import ErrorModal from '../../shared/shared-components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/shared-components/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook'

const Users = () => {

    const {isLoading,error,sendRequest,clearError} = useHttpClient()

    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const responseData = await sendRequest(`https://snapmap-backend.onrender.com/api/users`);
                
            setLoadedUsers(responseData.users);
            } catch(err){
                console.log("Could not fetch");
            };
            
        };
        fetchUsers();

    },[sendRequest]);

   

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            { isLoading && (
                <div className='center'>
                    <LoadingSpinner/>
                </div>
            )}
            {!isLoading && loadedUsers && <UserList items={loadedUsers}/>}
        </React.Fragment>)
};

export default Users;