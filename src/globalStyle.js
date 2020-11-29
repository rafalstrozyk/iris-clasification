import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap');

    *, *::before, *::after {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
    }
    html  {
        font-size:62.5%;
    }
    body {
        font-size: 1.6rem;
        overflow-x: hidden;
        margin: 0;
        height: 100%;
        padding: 0;
        font-weight: 300;
        display: block;
        font-family: 'Montserrat', sans-serif;
        background-color: #F2EBDC;
    }
    
    h1 {
        font-size: 2.4rem;
        font-weight: 300;
    }

    h2 {
        font-size: 2.2rem;
    }

    h3 {
        font-size: 2rem
    } 

    p {
        font-size: 1.7rem;
    }
`;

export default GlobalStyle;
