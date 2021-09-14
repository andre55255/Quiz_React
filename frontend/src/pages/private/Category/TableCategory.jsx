import React, { useEffect, useState } from 'react';
import './TableCategory.css';
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

export default function TableCategory({ token }) {

    const [categories, setCategories] = useState([]);
    const toast = useToast();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/category/all`, {
            headers: {
                authorization: "Bearer "+token
            }
        }).then(resp => {
            if (resp.data.length) {
                setCategories(resp.data);
            } else {
                toast({
                    title: "Aviso",
                    description: "Não existem categorias cadastradas",
                    status: "info",
                    position: "top",
                    isClosable: true,
                    duration: 4000    
                });
            }
        }).catch(err => {
            console.log(err);
            toast({
                title: "Aviso",
                description: "Não existem categorias cadastradas",
                status: "error",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        })
    }, [toast, token]);

    function deleteCategory(e) {
        const idCategory = e.target.parentNode.parentNode.children[0].innerHTML;
        const descriptionCategory = e.target.parentNode.parentNode.children[1].innerHTML;
        
        if (!idCategory || !descriptionCategory) {
            return toast({
                title: "Aviso",
                description: "Não existem paramêtros para deletar esta categoria",
                status: "info",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        }

        axios({
            url: `${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/category/deleteById/${idCategory}`,
            method: 'DELETE',
            headers: {
                Authorization: "Bearer "+token
            },
            params: {
                id: idCategory
            }
        }).then(resp => {
            if (resp.data.message) {
                return toast({
                    title: "Sucesso",
                    description: "Categoria deletada com sucesso",
                    status: "success",
                    position: "top",
                    isClosable: true,
                    duration: 4000    
                });
            } else {
                return toast({
                    title: "Erro",
                    description: "Categoria possui quiz vinculado, não é possível excluir",
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
                description: "Categoria possui quiz vinculado, não é possível excluir",
                status: "error",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        });
    }

    function TableIsEmpty() {
        return (
            <Tr>
                <Td 
                    colSpan="3"
                    textAlign="center"
                >
                    <CloseIcon 
                        h={5}
                        w={5}
                        textColor="red.300"
                    />
                    <Text>
                        Não há categorias cadastradas
                    </Text>
                </Td>
            </Tr>
        );
    }

    function renderRows() {
        return categories.map((cat, ind) => {
            return (
                <Tr key={ind}>
                    <Td>{cat.id}</Td>
                    <Td>{cat.description}</Td>
                    <Td>
                        <Text
                            className="icoDelete"
                            onClick={(e) => deleteCategory(e)}
                        >
                            X
                        </Text>
                    </Td>
                </Tr>
            );
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
                    <Tr>
                        <Th>ID</Th>
                        <Th>Descrição</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        (categories.length < 1) ? <TableIsEmpty /> : renderRows()
                    }
                </Tbody>
            </Table>
        </Container>
    );
}