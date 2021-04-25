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

const Button = styled.button`
    border: none;
    font-size: 1.2rem;
    margin-right: 30px;
    background: #6c757d;
    cursor: pointer;
    color: #f2f2f2;
    outline: none;
    padding: 5px;

    &:hover {
        background: #999;
    }
`;  

const ChangePassword: React.FC<{}> = () => {
    return (
        <Container>
            <Title>change password</Title>

            <Wrapper>
                <NextLink href='/forgot-password'>
                    <Button>
                        Change password
                    </Button>
                </NextLink>
            </Wrapper>  
        </Container>    
    )
}

export default ChangePassword;