import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2`
    color: black;
`;

const Input = styled.input`
    padding: 7px;
    margin-bottom: 20px;
    width: 90%;
`
const Footer = styled.div`
    border-top: 1px solid gray;
    padding: 25px;
`;

const ButtonStyles = `
    width: 50%;
    font-size: 20px;
    cursor: pointer;
    color: white;
    padding: 15px;
    outline: none;
    border: none;
`;

const Close = styled.button`
    ${ButtonStyles}
    background: gray;
    &:hover {
        background: silver;
    }
`;

const Submit = styled.button`
    ${ButtonStyles}
    background: green;
    &:hover {
        background: lightgreen;
    }
`

interface EditModalProps {
    isOpen: boolean;
    content: string;
    onSave(s: string): void;
    onClose() : void;
}

const EditModal : React.FC<EditModalProps> = ({ 
    isOpen, 
    content, 
    onClose, 
    onSave
}) => {
    const [text, setText] = useState(content);

    const onSubmit = () => {
        onSave(text);
        onClose();
    }

    return (
        <Modal
            open = {isOpen}
            closeOnEsc = {false}
            closeOnOverlayClick = {false}
            styles = {{ closeButton: { outline: 'none' } }}
            onClose = {onClose}
        >
            <Container>
                <Header>Create New Team</Header>

                <Input
                    type = 'text'
                    onChange = {(e) => setText(e.target.value)}
                    value = {text}
                />

                <Footer>
                    <Close onClick={onClose}>
                        Close
                    </Close>

                    <Submit onClick={onSubmit}>
                        Save
                    </Submit>
                </Footer>
            </Container>
        </Modal>
    )
}

export default EditModal;