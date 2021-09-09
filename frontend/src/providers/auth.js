import React, { useState } from 'react';

export const authContext = React.createContext({
    idUser: '',
    nameUser: '',
    emailUser: '',
    token: '',
});

export const AuthProvider = props => {

    const [user, setUser] = useState({
        idUser: '' || localStorage.getItem('idUser'),
        nameUser: '' || localStorage.getItem('nameUser'),
        emailUser: '' || localStorage.getItem('emailUser'),
        token: '' || localStorage.getItem('token')
    });

    return (
        <authContext.Provider value={{ user, setUser }}>
            {props.children}
        </authContext.Provider>
    );
}