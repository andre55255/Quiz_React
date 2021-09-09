import React, { useState } from 'react';
import './Register.css';

import { Box, Text, Stack, 
    FormControl, FormLabel, FormHelperText,
    Input, InputGroup, InputRightElement,
    Button, useToast
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';
import { emailValid } from '../../validation/email';
import axios from 'axios';

export default function Register() {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const history = useHistory();
    const toast = useToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function signUp() {
        if (!name && !email && !password && !confirmPassword) {
            return toast({
                title: "Erro",
                description: "Dados não informados",
                status: "warning",
                duration: 5000,
                position: "top-right",
                variant: "subtle",
                isClosable: true
            });
        } else if (name.length <= 8) {
            return toast({
                title: "Erro",
                description: "Informe seu nome completo",
                status: "warning",
                duration: 5000,
                position: "top-right",
                variant: "subtle",
                isClosable: true
            });
        } else if (!emailValid(email)) {
            return toast({
                title: "Erro",
                description: "Email inválido",
                status: "warning",
                duration: 5000,
                position: "top-right",
                variant: "subtle",
                isClosable: true
            });
        } else if (password.length !== 6) {
            return toast({
                title: "Erro",
                description: "A senha deve conter 6 dígitos/caracteres",
                status: "warning",
                duration: 5000,
                position: "top-right",
                variant: "subtle",
                isClosable: true
            });
        } else if (password !== confirmPassword) {
            return toast({
                title: "Erro",
                description: "Senhas não conferem",
                status: "warning",
                duration: 5000,
                position: "top-right",
                variant: "subtle",
                isClosable: true
            });
        } else {
            axios({
                url: `${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/user/signUp`,
                method: "post",
                data: {
                    name,
                    email,
                    password
                }
            }).then(resp => {
                if (resp.data.message) {
                    toast({
                        title: "Sucesso",
                        description: "Usuário registrado com sucesso",
                        status: "success",
                        duration: 5000,
                        position: "top-right",
                        isClosable: true
                    });
                    document.forms.form_register.reset();
                } else {
                    toast({
                        title: "Erro",
                        description: "Erro ao registrar, email duplicado",
                        status: "error",
                        duration: 5000,
                        position: "top-right",
                        isClosable: true
                    });
                }
            }).catch(err => {
                toast({
                    title: "Erro",
                    description: "Erro ao registrar, email duplicado",
                    status: "error",
                    duration: 5000,
                    position: "top-right",
                    isClosable: true
                });
                console.log(err)
            });
        }
    }

    return (
        <div className="container-register">
            <Box bg="#006494" w="80%" color="#fff" padding="3" borderRadius="md" textAlign="center">
                <Text fontSize="xl">
                    Registrar-se
                </Text>
            </Box>
            <Box bg="#fdfdfd" w="80%" h="55vh" marginTop="2" borderRadius="md">
                <Stack spacing={3}>
                    <form name="form_register">
                        <FormControl id="name" isRequired>
                            <FormLabel>Nome completo</FormLabel>
                            <Input
                                type="text"
                                placeholder="Digite seu nome completo"
                                size="sm"
                                onChange={e => setName(e.target.value)}
                            />
                            <FormHelperText>Ex: (Fulano de tal)</FormHelperText>
                        </FormControl>
                        <FormControl id="email" isRequired marginTop="2">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email" 
                                placeholder="Digite seu email"
                                size="sm"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <FormHelperText>Ex: (fulanodetal@email.com)</FormHelperText>
                        </FormControl>
                        <FormControl id="password" isRequired marginTop="2">
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
                            <FormHelperText>Ex: (Deve conter 6 dígitos/caracteres)</FormHelperText>
                        </FormControl>
                        <FormControl id="confirmPassword" isRequired marginTop="2">
                            <FormLabel>Confirme sua Senha</FormLabel>
                            <InputGroup size="sm">
                                <Input
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    placeholder="Digite sua senha novamente"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Ocultar" : "Mostrar"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText>Ex: (Deve ser igual ao campo anterior)</FormHelperText>
                        </FormControl>
                        <div className="btn-group">
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={signUp}
                            >
                                Registrar
                            </Button>
                            <Button
                                colorScheme="blue"
                                size="sm"
                                variant="outline"
                                marginLeft="1"
                                onClick={() => history.push('/')}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </Stack>
            </Box>
        </div>
    );
}
