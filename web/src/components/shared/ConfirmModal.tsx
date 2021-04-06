import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2`
    color: black;
`;

const Footer = styled.div`
    border-top: 1px solid gray;
    padding: 25px;
`;

const ButtonStyles = `
    width: 50%;
    font-size: 20px:
    cursor: pointer;
    color: white;
    padding: 15px;
    outline: none;
    border: none;
`;

const Close = styled.button`
    ${ButtonStyles}
    background: gray;
    $:hover {
        background: silver;
    }
`;

const Submit = styled.button`
    ${ButtonStyles}
    background: green;
    &:hover{
        background: lightgreen;
    }
`;

interface ConfirmModalProps {
    isOpen: boolean;
    onSave(): void;
    onClose(): void;
    title: string;
}

const ConfirmModal : React.FC<ConfirmModalProps> = ({ title, onSave , isOpen, onClose }) => {
    const onSubmit = () => {
        onSave();
        onClose();
    }

    return(
        <Modal
            open = {isOpen}
            closeOnEsc = {false}
            closeOnOverlayClick = {false}
            styles = {{closeButton: {outline: 'none'}}}
            onClose = {onClose}
        >
                <Container>
                    <Header>
                        {title}
                    </Header>

                    <Footer>
                        <Close onClick={onClose}>
                            Close
                        </Close>

                        <Submit onClick={onSubmit}>
                            Confirm
                        </Submit>
                    </Footer>
                </Container>
        </Modal>
    )
}

export default ConfirmModal;