import React from 'react';
import styled from 'styled-components';
import Teams from '../../components/shared/Teams';
import RecentChats from './RecentChats';

const Container = styled.div`
    height: 100vh;
    grid-template-columns: 100px 250px 1fr;
    overflow-x: hidden;
    display: grid;
`;

const Column = styled.div`
    height: 100vh;
`;

const Layout: React.FC<{}> = ({ children }) => {
    return (
        <Container>
            <Teams />

            <RecentChats />

            <Column>
                {children}
            </Column>
        </Container>
    )
}

export default Layout;