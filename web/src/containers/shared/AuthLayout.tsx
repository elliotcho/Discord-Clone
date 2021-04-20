import React from 'react';
import styled from 'styled-components';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import Navbar from '../../components/shared/Navbar';
import Teams from '../../components/shared/Teams';

const ContainerStyles = `
    position: relative;
    background: #737373;
    overflow: auto;
`;

const GridContainer = styled.div`
    ${ContainerStyles}

    display: grid;
    grid-template-columns: 100px auto;
    height: 100vh;
`;

const Container = styled.div`
    ${ContainerStyles}
    height: 92vh;
`;

const Layout: React.FC<{}> = ({ children }) => {
    const { data, loading } = useMeQuery({
        skip: isServer()
    });

    if(loading) {
        return null;
    }

    if(data?.me) {
        return (
            <GridContainer>
                <Teams />

                <>
                    {children}
                </>
            </GridContainer>
        )
    }

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