import React, { useEffect, useState } from 'react';

import { 
    Container, 
    useToast,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Input,
    Select,
    Button
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import axios from 'axios';

export default function NewQuiz({ token }) {

    const toast = useToast();
    const [categories, setCategories] = useState([]);
    const [quiz, setQuiz] = useState('');
    const [category, setCategory] = useState('');

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

   function loadOptionsCategories() {
        return categories.map((cat, ind) => {
            return (
                <option key={ind} value={cat.description}>{cat.description}</option>
            );
        });
    }

    function setNewQuiz() {
        if (!quiz || !category) {
            return toast({
                title: "Erro",
                description: "Informe os dados para cadastro",
                status: "warning",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        }

        axios({
            url: `${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/quiz/new`,
            method: 'post',
            headers: {
                Authorization: 'Bearer '+token
            },
            data: {
                quiz,
                category
            }
        }).then(resp => {
            if (resp.data.message) {
                document.forms.formNewQuiz.reset();
                return toast({
                    title: "Sucesso",
                    description: "Quiz cadastrado com sucesso",
                    status: "success",
                    position: "top",
                    isClosable: true,
                    duration: 4000    
                });
            } else {
                return toast({
                    title: "Erro",
                    description: "Não foi possível realizar o cadastro, tente novamente mais tarde",
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
                description: "Não foi possível realizar o cadastro, tente novamente mais tarde",
                status: "error",
                position: "top",
                isClosable: true,
                duration: 4000    
            });
        })

    }

    return (
        <Container
            display="flex"
            flexDirection="column"
            onKeyPress={(e) => {
                if (e.code === "Enter") {
                    document.getElementById("btnSetNewQuiz").click();
                }
            }}
        >
            <form 
                name="formNewQuiz"
            >
                <FormControl id="quiz">
                    <FormLabel>Novo quiz</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<AddIcon color="gray.300" />}
                        />
                        <Input 
                            type="text" 
                            placeholder="Digite o nome do quiz" 
                            autoComplete="off"    
                            onChange={e => setQuiz(e.target.value)}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl 
                    id="category"
                    marginTop=".5rem"
                >
                    <FormLabel>Selecione a categoria</FormLabel>
                    <Select 
                        placeholder="Selecione"
                        onChange={e => setCategory(e.target.options[e.target.selectedIndex].value)}    
                    >
                        {loadOptionsCategories()}
                    </Select>
                </FormControl>
                <Container
                    display="flex"
                    flexDirection="column"
                    alignSelf="flex-end"
                >
                    <Button
                        id="btnSetNewQuiz"
                        colorScheme="teal"
                        size="sm"
                        marginTop=".5rem"
                        width="fit-content"
                        alignSelf="flex-end"
                        onClick={setNewQuiz}
                    >
                        Cadastrar
                    </Button>
                </Container>
            </form>
        </Container>
    )
}
