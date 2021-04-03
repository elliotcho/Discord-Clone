import React from 'react';
import styled from 'styled-components';
import Teams from '../../components/shared/Teams';

const Container = styled.div`
    height: 100vh;
    grid-template-columns: 100px 250px 1fr;
    display: grid;
`;

const Layout: React.FC<{}> = ({ children }) => {
    return (
        <Container>
            <Teams />

            <div style={{background: '#1a1c20'}}>
            
            </div>

            <>
                {children}
            </>
        </Container>
    )
}

export default Layout;