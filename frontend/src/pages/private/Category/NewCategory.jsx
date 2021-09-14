import React, { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { 
    Container, 
    useToast,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Input,
    Button
} from '@chakra-ui/react';
import axios from 'axios';

export default function NewCategory({ token }) {

    const [category, setCategory] = useState('');
    const toast = useToast();

    function setNewCategory() {
        if (!category) {
            return toast({
                title: "Erro",
                description: "Informe uma categoria válida",
                status: "error",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        }

        axios({
            url: `${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/category/new`,
            method: 'post',
            headers: {
                Authorization: "Bearer "+token
            },
            data: {
                category
            }
        }).then(resp => {
            if (resp.data.message) {
                return toast({
                    title: "Sucesso",
                    description: "Categoria cadastrada com sucesso",
                    status: "success",
                    position: "top",
                    isClosable: true,
                    duration: 4000    
                });
            } else {
                return toast({
                    title: "Erro",
                    description: "Categoria é inválida ou já existe na base de dados",
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
                description: "Categoria é inválida ou já existe na base de dados",
                status: "error",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        });
    }

    return (
        <Container
            display="flex"
            flexDirection="column"
            onKeyPress={(e) => {
                if (e.code === "Enter") {
                    document.getElementById("btnSetNewCategory").click();
                }
            }}
        >
            <FormControl id="category">
                <FormLabel>Nova categoria</FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<AddIcon color="gray.300" />}
                    />
                    <Input 
                        type="text" 
                        placeholder="Digite o nome da categoria" 
                        autoComplete="off"    
                        onChange={e => setCategory(e.target.value)}
                    />
                </InputGroup>
            </FormControl>
            <Button
                id="btnSetNewCategory"
                colorScheme="teal"
                size="sm"
                marginTop=".5rem"
                width="fit-content"
                alignSelf="flex-end"
                onClick={setNewCategory}
            >
                Cadastrar
            </Button>
        </Container>
    );
}
