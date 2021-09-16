import React from 'react';

import Template from '../../../template/Index';

import { Heading } from '@chakra-ui/react';

export default function Question() {
    return (
        <Template>
            <Heading
                fontSize="lg"
                paddingTop=".5rem"
            >
                Gestão das questões
            </Heading>
        </Template>
    );
}
