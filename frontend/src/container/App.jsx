import React from 'react';
import Routes from '../routes/Routes';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../providers/auth';
 
export default function App() {
    return (
        <AuthProvider>
            <ChakraProvider>
                <Routes />
            </ChakraProvider>
        </AuthProvider>
    );
}
