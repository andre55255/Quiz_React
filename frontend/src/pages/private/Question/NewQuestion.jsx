import React, { useEffect, useState } from 'react';
import { 
    Container,
    useToast,
    FormControl,
    FormLabel,
    Select,
    InputGroup,
    InputLeftElement,
    Input,
    Button,
    Box
} from '@chakra-ui/react';

import {
    QuestionOutlineIcon,
    ArrowRightIcon
} from '@chakra-ui/icons';

import axios from 'axios';
import { isCorrectAnswer } from '../../../validation/isCorrectAnswer';

export default function NewQuestion({ token }) {

    const toast = useToast();
    const [quizes, setQuizes] = useState([]);

    const [quiz, setQuiz] = useState('');
    const [question, setQuestion] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [correct1, setCorrect1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [correct2, setCorrect2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [correct3, setCorrect3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [correct4, setCorrect4] = useState('');

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

    function createQuestion() {
        if (!quiz || !question || 
            !answer1 || !correct1 || 
            !answer2 || !correct2 ||
            !answer3 || !correct3 ||
            !answer4 || !correct4
            ) {
                return toast({
                    title: "Aviso",
                    description: "Informe todos os dados para cadastro de questão",
                    status: "warning",
                    position: "top-right",
                    isClosable: true,
                    duration: 4000 
                });
        }

        if (!isCorrectAnswer(correct1, correct2, correct3, correct4)) {
            return toast({
                title: "Aviso",
                description: "Deve haver uma resposta correta",
                status: "warning",
                position: "top-right",
                isClosable: true,
                duration: 4000 
            });
        }

        axios({
            url: `${process.env.REACT_APP_DEV_BASE_URL}:${process.env.REACT_APP_DEV_PORT}/question/new`,
            method: 'post',
            headers: {
                Authorization: 'Bearer '+token
            },
            data: {
                quiz,
                question,
                answer1,
                isCorrect1: correct1,
                answer2,
                isCorrect2: correct2,
                answer3,
                isCorrect3: correct3,
                answer4,
                isCorrect4: correct4
            }
        }).then(resp => {
            if (resp.data.message) {
                document.forms.formNewQuestion.reset();
                return toast({
                    title: "Sucesso",
                    description: "Questão criada com sucesso",
                    status: "success",
                    position: "top-right",
                    isClosable: true,
                    duration: 4000 
                });
            } else {
                return toast({
                    title: "Erro",
                    description: "Não foi possível criar a questão, tente novamente mais tarde",
                    status: "error",
                    position: "top-right",
                    isClosable: true,
                    duration: 4000 
                });
            }
        }).catch(err => {
            console.log(err);
            return toast({
                title: "Erro",
                description: "Não foi possível criar a questão, tente novamente mais tarde",
                status: "error",
                position: "top-right",
                isClosable: true,
                duration: 4000 
            });
        });
    }

    return (
        <Container
            maxW="container.xl"
            display="flex"
            flexDirection="column"
        >
            <form name="formNewQuestion">
                <FormControl 
                    id="quiz"
                    marginTop=".5rem"
                >
                    <FormLabel>Selecione o quiz</FormLabel>
                    <Select 
                        placeholder="Selecione"
                        onChange={e => setQuiz(e.target.options[e.target.selectedIndex].value)}    
                    >
                        {loadOptionsQuizes()}
                    </Select>
                </FormControl>
                <FormControl
                    id="question"
                    marginTop=".5rem"
                >
                    <FormLabel>Pergunta</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<QuestionOutlineIcon color="gray.300" />}
                        />
                        <Input 
                            type="text" 
                            placeholder="Digite a questão" 
                            autoComplete="off"    
                            onChange={e => setQuestion(e.target.value)}
                        />
                    </InputGroup>
                </FormControl>
                <Box
                    maxW="container.xl"
                    display="flex"
                >
                    <FormControl
                        id="answer1"
                        marginTop=".5rem"
                        marginRight=".5rem"
                    >
                        <FormLabel>Resposta 1</FormLabel>
                        <InputGroup>
                            <InputLeftElement 
                                pointerEvents="none"
                                children={<ArrowRightIcon color="gray.300"/>}
                            />
                            <Input 
                                type="text"
                                placeholder="Digite a resposta 1"
                                autoComplete="off"
                                onChange={e => setAnswer1(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl 
                        id="correct1"
                        marginTop=".5rem"
                        width="sm"
                    >
                        <FormLabel>Resposta correta?</FormLabel>
                        <Select 
                            placeholder="Selecione"
                            onChange={e => setCorrect1(e.target.options[e.target.selectedIndex].value)}    
                        >
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    maxW="container.xl"
                    display="flex"
                >
                    <FormControl
                        id="answer2"
                        marginTop=".5rem"
                        marginRight=".5rem"
                    >
                        <FormLabel>Resposta 2</FormLabel>
                        <InputGroup>
                            <InputLeftElement 
                                pointerEvents="none"
                                children={<ArrowRightIcon color="gray.300"/>}
                            />
                            <Input 
                                type="text"
                                placeholder="Digite a resposta 2"
                                autoComplete="off"
                                onChange={e => setAnswer2(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl 
                        id="correct2"
                        marginTop=".5rem"
                        width="sm"
                    >
                        <FormLabel>Resposta correta?</FormLabel>
                        <Select 
                            placeholder="Selecione"
                            onChange={e => setCorrect2(e.target.options[e.target.selectedIndex].value)}    
                        >
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    maxW="container.xl"
                    display="flex"
                >
                    <FormControl
                        id="answer3"
                        marginTop=".5rem"
                        marginRight=".5rem"
                    >
                        <FormLabel>Resposta 3</FormLabel>
                        <InputGroup>
                            <InputLeftElement 
                                pointerEvents="none"
                                children={<ArrowRightIcon color="gray.300"/>}
                            />
                            <Input 
                                type="text"
                                placeholder="Digite a resposta 3"
                                autoComplete="off"
                                onChange={e => setAnswer3(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl 
                        id="correct3"
                        marginTop=".5rem"
                        width="sm"
                    >
                        <FormLabel>Resposta correta?</FormLabel>
                        <Select 
                            placeholder="Selecione"
                            onChange={e => setCorrect3(e.target.options[e.target.selectedIndex].value)}    
                        >
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    maxW="container.xl"
                    display="flex"
                >
                    <FormControl
                        id="answer4"
                        marginTop=".5rem"
                        marginRight=".5rem"
                    >
                        <FormLabel>Resposta 4</FormLabel>
                        <InputGroup>
                            <InputLeftElement 
                                pointerEvents="none"
                                children={<ArrowRightIcon color="gray.300"/>}
                            />
                            <Input 
                                type="text"
                                placeholder="Digite a resposta 4"
                                autoComplete="off"
                                onChange={e => setAnswer4(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl 
                        id="correct4"
                        marginTop=".5rem"
                        width="sm"
                    >
                        <FormLabel>Resposta correta?</FormLabel>
                        <Select 
                            placeholder="Selecione"
                            onChange={e => setCorrect4(e.target.options[e.target.selectedIndex].value)}    
                        >
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </Select>
                    </FormControl>
                </Box>
            </form>
            <Container
                maxW="container.xl"
                display="flex"
                justifyContent="flex-end"
                marginY="1rem"
            >
                <Button
                    colorScheme="messenger"
                    onClick={createQuestion}
                >
                    Criar
                </Button>
            </Container>
        </Container>
    )
}