import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const Container = styled.div`
    margin-top: 50px;
`;

const Title = styled.h3`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Wrapper = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background: #262626;
    min-height: 100px;
    padding: 12px;
`;

const ButtonStyles = `
    border: none;
    font-size: 1.2rem;
    margin-right: 30px;
    cursor: pointer;
    color: #f2f2f2;
    outline: none;
    padding: 5px;
`;

const Secondary = styled.button`
    ${ButtonStyles}
    background: #6c757d;

    &:hover {
        background: #999;
    }
`;  

const Danger = styled.button`
    ${ButtonStyles}
    background: #d9534f;

    &:hover {
        background: #ff0000;
    }
`;

const MyAccountFooter: React.FC<{}> = () => {
    return (
        <Container>
            <Title>manage account</Title>

            <Wrapper>
                <NextLink href='/forgot-password'>
                    <Secondary>
                        Change password
                    </Secondary>
                </NextLink>

                <Danger>
                    Delete Account
                </Danger>
            </Wrapper>  
        </Container>    
    )
}

export default MyAccountFooter;