import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
    color: black;
`;

const Title: React.FC<{}> = ({ children }) => (
    <Header>
        {children}
    </Header>
)

export default Title;