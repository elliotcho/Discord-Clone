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
    isLoading?: boolean;
    bg: string;
}

const Index: React.FC<ButtonProps> = ({ children, isLoading, bg }) => {
    let type: 'submit' | 'button' | 'reset';
    const style = { background: bg };

    if(isLoading) {
        type = 'button';
    } else {
        type = 'submit';
    }

    return (
        <Button type={type} style={style}>
            {isLoading? 'Loading...': children}
        </Button>
    )
}

export default Index;