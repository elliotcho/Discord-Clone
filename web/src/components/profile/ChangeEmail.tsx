import React from 'react';
import styled from 'styled-components';

const Title = styled.h3`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Flex = styled.div`
    display: flex;
    background: #333;
    align-items: center;
    color: #f2f2f2;
    padding: 12px;
`;

const Box = styled.div`
    margin-left: auto; 
`;

const Button = styled.button`
    border: none;
    cursor: pointer;
    font-size: 1.0rem;
    background: #6c757d;
    color: #f2f2f2;
    outline: none;
    padding: 5px;

    &:hover {
        background: #999;
    }
`;

interface ChangeEmailProps {
    email: string;
}

const ChangeEmail : React.FC<ChangeEmailProps> = ({ email }) => {
    return (
        <>
            <Title>email</Title>
            
            <Flex>
                <p>{email}</p>
                
                <Box>
                    <Button>Edit</Button>
                </Box>
            </Flex>
        </>
    )
}

export default ChangeEmail;