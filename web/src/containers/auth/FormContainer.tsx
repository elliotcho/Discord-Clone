import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 40%;
    padding: 1.2rem;
    margin: 60px auto;
    height: fit-content;
    text-align: center;
    border-radius: 16px;
    font-family: 'Caveat', cursive;
    word-spacing: 2px;
    font-size: 21px;
    color: #000000;
`;

interface FormContainerProps {
    borderColor: string;
    bg: string;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, borderColor, bg }) => {
    const style = {
        border: `3px outset ${borderColor}`,
        background: bg
    }

    return (
        <Container style={style}>
            {children}
        </Container>
    )
}

export default FormContainer;