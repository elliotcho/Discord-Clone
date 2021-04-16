import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2`
    color: #404040;
`;

const Input = styled.input`
    padding: 7px;
    font-size: 1.3rem;
    margin-bottom: 20px;
    width: 90%;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    font-size: 1.3rem;
    resize: none;
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
    background: green;
    &:hover {
        background: #009933;
    }
`

interface EditModalProps {
    isOpen: boolean;
    content?: string;
    onSave(s: string): void;
    onClose() : void;
    title: string;
    size?: string;
}

const EditModal : React.FC<EditModalProps> = ({  
    content = '', 
    onClose, 
    onSave,
    isOpen,
    title,
    size
}) => {
    const [text, setText] = useState(content);

    const onSubmit = () => {
        if(text.trim().length === 0) {
            return;
        }

        onSave(text);
        onClose();
    }

    return (
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
                <Header>{title}</Header>

                {size && (
                    <Input
                        type = 'text'
                        onChange = {(e) => setText(e.target.value)}
                        value = {text}
                    />
                )}

                {!size && (
                    <Textarea
                        onChange = {(e) => setText(e.target.value)}
                        value = {text}
                    />
                )}

                <Flex>
                    <Footer>
                        <Close onClick={onClose}>
                            Close
                        </Close>

                        <Submit onClick={onSubmit}>
                            Save
                        </Submit>
                    </Footer>
                </Flex>
            </Container>

        </Modal>
    )
}

export default EditModal;