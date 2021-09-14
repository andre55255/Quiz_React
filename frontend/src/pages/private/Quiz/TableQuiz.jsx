import React, { useEffect, useState } from 'react';
import '../Category/TableCategory.css';

import axios from 'axios';

import { 
    useToast,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Container
} from '@chakra-ui/react';

import { CloseIcon } from '@chakra-ui/icons';

export default function TableQuiz({ token }) {

    const [quizes, setQuizes] = useState([]);
    const toast = useToast();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/quiz/allByUser`, {
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(resp => {
            if (resp.data.length > 0) {
                setQuizes(resp.data);
            } else {
                return toast({
                    title: "Aviso",
                    description: "Você não possui quiz cadastrado",
                    status: "info",
                    position: "top",
                    isClosable: true,
                    duration: 4000    
                });
            }
        }).catch(err => {
            console.log(err);
            return toast({
                title: "Aviso",
                description: "Você não possui quiz cadastrado",
                status: "info",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        })
    }, [toast, token]);

    function TableIsEmpty() {
        return (
            <Tr>
                <Td 
                    colSpan="5"
                    textAlign="center"
                >
                    <CloseIcon 
                        h={5}
                        w={5}
                        textColor="red.300"
                    />
                    <Text>
                        Não há quiz cadastrado
                    </Text>
                </Td>
            </Tr>
        );
    }

    function renderRows() {
        return quizes.map((qui, ind) => {
            return (
                <Tr key={ind}>
                    <Td>{qui.idQuiz}</Td>
                    <Td>{qui.nameQuiz}</Td>
                    <Td>{qui.descriptionCategory}</Td>
                    <Td>{qui.nameUser}</Td>
                    <Td
                        display="flex"
                        alignItems="center"
                    >
                        <Text
                            className="icoDelete"
                            marginRight=".5rem"
                            onClick={e => deleteQuiz(e)}
                        >
                            X
                        </Text>
                        {/*<Text
                            className="icoUpdate"
                        >
                            O
                        </Text>*/}
                    </Td>
                </Tr>
            );
        });
    }

    function deleteQuiz(e) {
        const quiz = e.target.parentNode.parentNode.children[1].innerHTML;
        const category = e.target.parentNode.parentNode.children[2].innerHTML;

        if (!quiz || !category) {
            return toast({
                title: "Aviso",
                description: "Parâmetros não informados, tente novamente",
                status: "warning",
                variant: "subtle",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        }

        axios({
            url: `${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/quiz/delete/${quiz}/${category}`,
            method: 'DELETE',
            headers: {
                Authorization: "Bearer "+token
            },
            params: {
                quiz,
                category
            }
        }).then(resp => {
            if (resp.data.message) {
                return toast({
                    title: "Sucesso",
                    description: "Quiz excluído com sucesso",
                    status: "success",
                    position: "top",
                    isClosable: true,
                    duration: 4000    
                });
            } else {
                return toast({
                    title: "Erro",
                    description: "Não foi possível excluir este quiz, tente novamente mais tarde",
                    status: "error",
                    position: "top",
                    isClosable: true,
                    duration: 4000    
                });
            }
        }).catch(err => {
            console.log(err);
            return toast({
                title: "Erro",
                description: "Não foi possível excluir este quiz, tente novamente mais tarde",
                status: "error",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        });
    }

    return (
        <Container
            maxW="container.xl"
        >
            <Table
                variant="striped"
                colorScheme="twitter"
            >
                <Thead>
                    <Th>ID</Th>
                    <Th>Descrição</Th>
                    <Th>Categoria</Th>
                    <Th>Usuário</Th>
                    <Th>Ações</Th>
                </Thead>
                <Tbody>
                    {
                        (quizes.length < 1) ? <TableIsEmpty /> : renderRows()
                    }
                </Tbody>
            </Table>
        </Container>
    )
}
