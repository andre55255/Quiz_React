import React, { useState, useContext } from 'react';
import './Login.css';

import { Box, Text, Stack, 
    FormControl, FormLabel, 
    Input, InputGroup, InputRightElement,
    Button, useToast
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';
import { authContext } from '../../providers/auth';
import axios from 'axios';

export default function Login() {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const history = useHistory();
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useContext(authContext);

    function signIn() {
        if (!email && !password) {
            return toast({
                title: "Erro",
                description: "Informe os dados",
                status: "warning",
                variant: "subtle",
                position: "top-right",
                isClosable: true
            });
        } else {
            axios({
                url: `${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/user/signIn`,
                method: "post",
                data: {
                    email,
                    password
                }
            }).then(resp => {
                if (resp.data.message) {
                    toast({
                        title: "Sucesso",
                        description: "Usuário logado com sucesso",
                        status: "success",
                        variant: "subtle",
                        position: "top-right",
                        isClosable: true
                    });

                    document.forms.form_login.reset();

                    localStorage.setItem('idUser', resp.data.idUser);
                    localStorage.setItem('nameUser', resp.data.nameUser);
                    localStorage.setItem('emailUser', resp.data.emailUser);
                    localStorage.setItem('token', resp.data.token);

                    setUser({
                        idUser: resp.data.idUser,
                        nameUser: resp.data.nameUser,
                        emailUser: resp.data.emailUser,
                        token: resp.data.token
                    });

                    history.push('/home');
                } else {
                    toast({
                        title: "Erro",
                        description: "Usuário ou senha incorretos",
                        status: "error",
                        variant: "subtle",
                        position: "top-right",
                        isClosable: true
                    });
                }
            }).catch(err => {
                console.log(err);
                toast({
                    title: "Erro",
                    description: "Usuário ou senha incorretos",
                    status: "error",
                    variant: "subtle",
                    position: "top-right",
                    isClosable: true
                });
            });
        }
    }

    return (
        <div className="container-login">
            <Box bg="#003554" w="80%" color="#fff" padding="3" borderRadius="md" textAlign="center">
                <Text fontSize="xl">
                    Login
                </Text>
            </Box>
            <Box bg="#fdfdfd" w="80%" h="55vh" marginTop="2" borderRadius="md">
                <Stack spacing={3}>
                    <form name="form_login">
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email" 
                                placeholder="Digite seu email"
                                size="sm"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired marginTop="1">
                            <FormLabel>Senha</FormLabel>
                            <InputGroup size="sm">
                                <Input
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    onChange={e => setPassword(e.target.value)}
                                    />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Ocultar" : "Mostrar"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <div className="btn-group">
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={signIn}
                            >
                                Login
                            </Button>
                            <Button
                                colorScheme="blue"
                                size="sm"
                                variant="outline"
                                marginLeft="1"
                                onClick={() => history.push('/register')}
                            >
                                Registrar
                            </Button>
                        </div>
                    </form>
                </Stack>
            </Box>
        </div>
    );
}
