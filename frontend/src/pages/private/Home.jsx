import React, { useContext } from 'react';
import { authContext } from '../../providers/auth';

export default function Home() {
    
    const { user } = useContext(authContext);

    return (
        <div>
            <span>Nome: {user.nameUser}</span>
            <span>Email: {user.emailUser}</span>
            <span>ID: {user.idUser}</span>
            <span>Token: {user.token}</span>
        </div>
    );
}
