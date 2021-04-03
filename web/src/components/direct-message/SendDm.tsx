import React from 'react';
import styled from 'styled-components';
import { handleEnterPress } from '../../utils/handleEnterPress';

const Container = styled.div`
    display: grid; 
    grid-template-columns: 50px auto;
    background: #595959;
    grid-gap: 30px;
    padding: 20px;
`;

const Button = styled.button`
    color: white;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.4rem;
    background: #a6a6a6;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    
    &:hover {
        box-shadow: 0 0 5px black;
    }

    &:focus {
        outline: none;
    }
`;

const Textarea = styled.textarea`
    width: 90%;
    height: 35px;
    max-height: 130px;
    background: #737373;
    font-family: 'Arial';
    border-radius: 11px;
    font-size: 1.8rem;
    overflow: hidden;
    color: #f2f2f2;
    resize: none;
    &:focus {
        outline: none;
    }
`;

interface SendDmProps {
    userId: number;
}

const SendDm: React.FC<SendDmProps> = () => {
    return (
        <Container>
            <Button>
                +
            </Button>

            <Textarea
                onKeyDown = {(e) => {
                    const submit = handleEnterPress(e, 130);
                }}
            />
        </Container>
    )
}

export default SendDm;