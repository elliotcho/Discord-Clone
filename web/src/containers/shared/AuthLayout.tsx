import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';

const Container = styled.div`
    height: 92vh;
    position: relative;
    background: #737373;
    overflow: auto;
`;

const Layout: React.FC<{}> = ({ children }) => {
    return (
        <>
            <Navbar />

            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout;