import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 40%;
    margin: 60px auto;
    padding: 1.2rem;
    border-radius: 16px;
    text-align: center;
    font-family: 'Caveat', cursive;
    font-size: 21px;
    word-spacing: 2px;
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