import React from 'react';

import Header from './Header/Header';
import NavBar from './NavBar/NavBar';
import Main from './Main/Main';
import Footer from './Footer/Footer';

import { Grid, GridItem } from "@chakra-ui/react";

export default function Index(props) {
    return (
        <Grid
            h="100%"
            templateRows="repeat(12, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={1}
        >
            <GridItem
                rowSpan={2}
                colSpan={3}
                bg="#d3ffe9"
            >
                <Header/>
            </GridItem>
            <GridItem
                rowSpan={1}
                colSpan={3}
                bg="#f3ede9"
                opacity=".8"
            >
                <NavBar/>
            </GridItem>
            <GridItem
                rowSpan={8}
                colSpan={3}
                bg="#ffffff"
            >
                <Main>
                    {props.children}
                </Main>
            </GridItem>
            <GridItem
                rowSpan={1}
                colSpan={3}
                bg="#f3ede9"
                opacity="0.8"
            >
                <Footer/>
            </GridItem>
        </Grid>
    );
}