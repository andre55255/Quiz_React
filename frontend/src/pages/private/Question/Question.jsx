import React, { useEffect, useContext } from 'react';

import { authContext } from '../../../providers/auth';
import { useHistory } from 'react-router-dom';

import Template from '../../../template/Index';
import NewQuestion from './NewQuestion';
import SelectQuizQuestion from './SelectQuizQuestion';

import { 
    Heading, 
    useDisclosure, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    Button,
    Container, 
    useToast,
    ModalHeader,
    ModalCloseButton
} from '@chakra-ui/react';

import axios from 'axios';

export default function Question() {

    const { user, setUser } = useContext(authContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const toast = useToast();

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
            setUser({
                idUser: '',
                nameUser: '',
                emailUser: '',
                token: ''
            });
            
            localStorage.clear();
            history.push("/");
        });
    }, [user, setUser, toast, history]);
    
    return (
        <Template>
            <Heading
                fontSize="lg"
                paddingTop=".5rem"
                marginBottom="1rem"
            >
                Gestão das questões
            </Heading>
            <Container
                centerContent
            >
                <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={onOpen}
                >
                    Nova questão
                </Button>
                <Modal 
                    isOpen={isOpen} 
                    onClose={onClose}
                    size="full"
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Cadastro de nova questão</ModalHeader>
                        <ModalCloseButton />
                        <NewQuestion token={user.token}/>
                    </ModalContent>
                </Modal>
            </Container>
            <Container
                centerContent
                maxW="container.lg"
                display="flex"
                flexDirection="column"
            >
                <SelectQuizQuestion token={user.token}/>
            </Container>
        </Template>
    );
}
