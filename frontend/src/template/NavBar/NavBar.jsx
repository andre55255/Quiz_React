import React , { useContext }from 'react';
import './NavBar.css';
import { authContext } from '../../providers/auth';
import { Link } from 'react-router-dom';
import { Text } from "@chakra-ui/react";
import { SettingsIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function NavBar() {

    const { setUser } = useContext(authContext);

    return (
        <nav className="navBar">
            <Text
                fontSize="lg"
                className="navItem"
            >
                <SettingsIcon 
                    w={4}
                    h={4}
                    marginRight=".3rem"
                />
                <Link to="/category">
                    Categoria
                </Link>
            </Text>
            <Text
                fontSize="lg"
                className="navItem"
            >
                <SettingsIcon 
                    w={4}
                    h={4}
                    marginRight=".3rem"
                />
                <Link to="/quiz">
                    Quiz
                </Link>
            </Text>
            <Text
                fontSize="lg"
                className="navItem"
            >
                <SettingsIcon 
                    w={4}
                    h={4}
                    marginRight=".3rem"
                />
                <Link to="/question">
                    Questões
                </Link>
            </Text>
            <Text
                fontSize="lg"
                className="navItem"
            >
                <SettingsIcon 
                    w={4}
                    h={4}
                    marginRight=".3rem"
                />
                <Link to="/play">
                    Jogar
                </Link>
            </Text>
            <Text
                fontSize="lg"
                className="navItemExit"
            >
                <ArrowForwardIcon 
                    w={4}
                    h={4}
                    marginRight=".3rem"
                />
                <Link 
                    to="/"
                    onClick={() => {
                        setUser({
                            idUser: '',
                            nameUser: '',
                            emailUser:'',
                            token: ''
                        });
                        localStorage.clear();
                    }}
                >
                    Sair
                </Link>
            </Text>
        </nav>
    );
}