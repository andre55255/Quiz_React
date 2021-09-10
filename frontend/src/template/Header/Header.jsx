import React from 'react';
import './Header.css';
import { useHistory } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

export default function Header() {

    const history = useHistory();

    function returnHome() {
        history.push('/home');
    }

    return (
        <header className="header">
            <QuestionOutlineIcon 
                className="actionTransition"
                w={12}
                h={12}
                onClick={returnHome}
            />
            <Heading
                className="actionTransition"
                as="h1"
                size="xl"
                marginLeft="1rem"
                onClick={returnHome}
            >
                Quiz React
            </Heading>
        </header>
    );
}