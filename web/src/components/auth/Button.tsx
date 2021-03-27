import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 40%;
    padding: 1%;
    margin: 14px auto 4px;
    font-size: 20px;
    font-family: 'Permanent Marker', cursive;
    letter-spacing: 3px;
    border-radius: 19px;
    cursor: pointer;
    outline: none;

    &:hover {
        box-shadow: 0 0 5px black;
    }
`;

interface ButtonProps {
    bg: string;
}

const Index: React.FC<ButtonProps> = ({ children, bg }) => {
    const style = { background: bg };

    return (
        <Button type='submit' style={style}>
            {children}
        </Button>
    )
}

export default Index;