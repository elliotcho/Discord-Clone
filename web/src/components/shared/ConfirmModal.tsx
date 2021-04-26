import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2`
    color: black;
`;

const Flex = styled.div`
    display: flex;
    border-top: 1px solid gray;
    padding: 25px;
`;

const Footer = styled.div`
    margin-left: auto;
`;

const ButtonStyles = `
    color: white;
    margin-left: 15px;
    font-size: 20px;
    cursor: pointer;
    padding: 15px;
    outline: none;
    border: none;
`;

const Close = styled.button`
    ${ButtonStyles}
    background: gray;
    &:hover {
        background: #999;
    }
`;

const Submit = styled.button`
    ${ButtonStyles}
    background: red;
    &:hover {
        background: orangered;
    }
`;

interface ConfirmModalProps {
    isOpen: boolean;
    onSave(): void;
    onClose(): void;
    title: string;
}

const ConfirmModal : React.FC<ConfirmModalProps> = ({
     title, 
     onSave,
     onClose,  
     isOpen
}) => {
    const onSubmit = () => {
        onSave();
        onClose();
    }

    return(
        <Modal
            open = {isOpen}
            onClose = {onClose}
            closeOnEsc = {false}
            closeOnOverlayClick = {false}
            styles = {{ 
                closeButton: { outline: 'none' },
                modal: { background: '#b3b3b3' }
            }}
        >
                <Container>
                    <Header>
                        {title}
                    </Header>

                    <Flex>
                        <Footer>
                            <Close onClick={onClose}>
                                Close
                            </Close>

                            <Submit onClick={onSubmit}>
                                Confirm
                            </Submit>
                        </Footer>
                    </Flex>
                </Container>
        </Modal>
    )
}

export default ConfirmModal;