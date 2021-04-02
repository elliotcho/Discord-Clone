import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    display: block;
    width: 70%;
    margin: 5px auto;
    font-size: 17px;
    font-family: 'Shadows Into Light', cursive;
    font-weight: 900;
    letter-spacing: 3px;
    border-radius: 10px;
    outline: none;
`;

interface InputFieldProps {
    type: string;
    placeholder: string;
    onChange(e: any) : void;
    value: string;
    name: string;
}

const InputField: React.FC<InputFieldProps> = (props) => {
    return (
        <Input {...props}/>
    )
}

export default InputField;