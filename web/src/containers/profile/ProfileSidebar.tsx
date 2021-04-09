import React from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { useLogoutMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

const Container = styled.div`
    background: #262626;
    display: flex;
`;

const Box = styled.div`
    margin: 50px 30px 0 auto;
    max-width: 120px;
`;

const Ul = styled.ul`
    width: 100%;
    color: #f2f2f2;
`;

const Li = styled.li`
    cursor: pointer;
    font-size: 1.1rem;
    list-style-type: none;
    padding: 10px 20px;
    color: #f2f2f2;

    &:hover {
        background: #404040;
    }
`;

const ProfileSidebar: React.FC<{}> = () => {
    const [logout] = useLogoutMutation();
    const apolloClient = useApolloClient();
    const router = useRouter();

    return (
        <Container>
            <Box>
                <Ul>
                    <Li 
                        style={{ color: '#e60000'}}
                        onClick = {async (e) => {
                            e.preventDefault();

                            await logout();
                            await apolloClient.resetStore();

                            router.push('/');
                        }}
                    >
                        Log Out
                    </Li>
                </Ul>
            </Box>
        </Container>
    )
}

export default ProfileSidebar;