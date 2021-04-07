import React from 'react';
import styled from 'styled-components';
import ProfileCard from '../../components/profile/ProfileCard';
import { useRouter } from 'next/router';

const Container = styled.div`
    background: #808080;
`;

const Flex = styled.div`
    display: flex;
    margin: 50px auto;
    width: 80%;
`;

const Box = styled.div`
    margin-left: auto;
`;

const Escape = styled.button`
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.4rem;
    border: solid 1px #e6e6e6;
    background: none;
    color: #e6e6e6;

    &:focus {
        outline: none;
    }

    &:hover {
        background: #d9d9d9;
        color: black;
    }
`;

const Text = styled.div`
    margin-top: 5px;
    color: #e6e6e6;
`;

const MyAccount: React.FC<{}> = () => {
    const router = useRouter();

    return (
        <Container>
            <Flex>
                <ProfileCard />

                <Box>
                    <Escape onClick={() => router.back()}>
                        X
                    </Escape>

                    <Text>ESC</Text>
                </Box>
            </Flex>
        </Container>
    )
}

export default MyAccount;