import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: grid;
    grid-template-columns: 350px auto 250px;
    overflow-x: hidden;
    height: 100vh;
`;

const Column = styled.div`
    background: #4d4d4d;
`;

const Box = styled.div`
    margin: 50px 0 0 15px;
`;

const Escape = styled.button`
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.4rem;
    border: solid 3px #999;
    color: #e6e6e6;
    background: none;
    outline: none;

    &:hover {
        background: #d9d9d9;
        color: black;
    }
`;

const Text = styled.div`
    margin-top: 5px;
    color: #b3b3b3;
`;

const ChannelSettings : React.FC<{}> =() => {
    const router = useRouter();

    return (
        <Container>
            <div style={{background: 'black'}}></div>
            
            <div></div>

            <Column>
                <Box>
                    <Escape onClick={() => router.back()}>
                        X
                    </Escape>

                    <Text>
                        ESC
                    </Text>
                </Box>
            </Column>
        </Container>
    )
}

export default withApollo({ ssr: false })(ChannelSettings);