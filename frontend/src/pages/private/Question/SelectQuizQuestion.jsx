import React, { useEffect, useState } from 'react';

import {  
    useToast,
    FormControl,
    FormLabel,
    Select,
    Button,
    Container,
    Table,
    Thead,
    Th,
    Tbody,
    Tr,
    Td,
    Text
} from '@chakra-ui/react';

import axios from 'axios';

export default function SelectQuizQuestion({ token }) {

    const toast = useToast();
    const [quizes, setQuizes] = useState([]);
    const [quiz, setQuiz] = useState('');
    const [dataQuestion, setDataQuestion] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/quiz/allByUser`, {
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(resp => {
            if (resp.data.length > 0) {
                console.log(resp.data);
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

    function loadOptionsQuizes() {
        return quizes.map((qui, ind) => {
            return (
                <option key={ind} value={qui.nameQuiz}>{qui.nameQuiz}</option>
            );
        });
    }

    function loadQuestions() {
        if (!quiz) {
            return toast({
                title: "Aviso",
                description: "Quiz não selecionado",
                status: "warning",
                variant: "subtle",
                position: "top",
                isClosable: true,
                duration: 4000  
            });
        }

        axios({
            url: `${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/question/all`,
            method: "get",
            headers: {
                Authorization: "Bearer "+token
            },
            params: {
                quiz
            }
        }).then(resp => {
            if (resp.data.length < 1) {
                return toast({
                    title: "Aviso",
                    description: "Quiz não possui questões cadastradas",
                    status: "error",
                    variant: "subtle",
                    position: "top",
                    isClosable: true,
                    duration: 4000  
                });
            } else {
                setDataQuestion(resp.data);
            }
        }).catch(err => {
            console.log(err);
            return toast({
                title: "Erro",
                description: "Quiz não possui questões cadastradas",
                status: "error",
                position: "top",
                isClosable: true,
                duration: 4000  
            });
        });
    }

    function renderRows() {
        return dataQuestion.filter((val, ind) => {
            if (ind === 0) return true;
            
            if (ind % 4 === 0) return true;

            return false;
        }).map((val, ind) => {
            return (
                <Tr>
                    <Td>{val.quiz} - {val.category}</Td>
                    <Td>{val.question}</Td>
                    <Td>
                        <Text
                            className="icoDelete"
                        >
                            X
                        </Text>
                    </Td>
                </Tr>
            );
        });
    }

    return (
        <>
            <FormControl 
                id="quiz"
                marginTop=".5rem"
            >
                <FormLabel>Selecione o quiz para carregar as questões</FormLabel>
                <Select 
                    placeholder="Selecione"
                    onChange={e => setQuiz(e.target.options[e.target.selectedIndex].value)}    
                >
                    {loadOptionsQuizes()}
                </Select>
            </FormControl>
            <Button
                alignSelf="flex-end"
                marginTop=".5rem"
                onClick={loadQuestions}
            >
                Carregar
            </Button>
            <Container
                maxW="container.xl"
            >
                <Table
                    variant="striped"
                    colorScheme="messenger"
                >
                    <Thead>
                        <Th>Quiz</Th>
                        <Th>Pergunta</Th>
                        <Th>Ações</Th>
                    </Thead>
                    <Tbody>
                        {
                            (dataQuestion.length > 0) ? renderRows() : ''
                        }
                    </Tbody>
                </Table>
            </Container>
        </>
    )
}
