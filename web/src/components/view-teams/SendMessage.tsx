import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: 50px auto;
    background: #4d4d4d;
    padding: 20px;
`;

const Button = styled.button`
    width: 35px;
    font-size: 20px;
    background: lightgray;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    outline:none;
    &:hover {
        background: white;
    }
`;

const Textarea = styled.textarea`
    margin-left: 30px;
    resize: none;
`;

const SendMessage: React.FC<{}> = () => {
    return (
        <Container>
            <Button>
                +
            </Button>

            <Textarea />
        </Container>
    )
}

export default SendMessage;