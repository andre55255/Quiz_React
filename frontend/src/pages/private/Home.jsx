import React, { useContext, useEffect } from 'react';
import { authContext } from '../../providers/auth';
import { useHistory } from 'react-router-dom';
import Template from '../../template/Index';
import { useToast } from "@chakra-ui/react";

import axios from 'axios';

export default function Home() {
    
    const { user, setUser } = useContext(authContext);
    const toast = useToast();
    const history = useHistory();

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/verification/token`,
            method: 'post',
            headers: {
                Authorization: "Bearer " +user.token
            }
        }).then(resp => {
            if (resp.data.message) {
                console.log("Authenticated success");
            } else {
                toast({
                    title: "Autenticação falhou",
                    description: "Token de validação expirado",
                    status: "error",
                    position: "top",
                    isClosable: true,
                    duration: 4000    
                });
                setUser({
                    idUser: '',
                    nameUser: '',
                    emailUser: '',
                    token: ''
                });
                
                localStorage.clear();

                history.push("/");
            }
        }).catch(err => {
            console.log(err);
            toast({
                title: "Autenticação falhou",
                description: "Token de validação expirado",
                status: "error",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
            history.push("/");
        });
    }, [user, setUser, toast, history]);

    return (
        <Template>
            Opa
        </Template>
    );
}
