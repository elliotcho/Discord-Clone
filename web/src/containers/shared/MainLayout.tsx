import React from 'react';
import styled from 'styled-components';
import Teams from '../../components/shared/Teams';
import UserNav from '../../components/shared/UserNav';

const Container = styled.div`
    height: 100vh;
    grid-template-columns: 100px 250px 1fr;
    display: grid;
`;

const Column = styled.div`
    height: 100vh;
`;

const Layout: React.FC<{}> = ({ children }) => {
    return (
        <Container>
            <Teams />

            <div style={{background: '#1a1c20', position: 'relative'}}>
                <UserNav />
            </div>

            <Column>
                {children}
            </Column>
        </Container>
    )
}

export default Layout;