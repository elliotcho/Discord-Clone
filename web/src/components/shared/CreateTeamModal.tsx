import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Modal } from 'react-responsive-modal';
import { useCreateTeamMutation } from '../../generated/graphql';
import 'react-responsive-modal/styles.css';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2``;

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

interface CreateTeamModalProps {
    isOpen: boolean;
    onClose() : void;
}

const CreateTeamModal : React.FC<CreateTeamModalProps> = ({ isOpen, onClose }) => {
    const [createTeam] = useCreateTeamMutation();

    return (
        <Modal
            open = {isOpen}
            closeOnEsc = {false}
            closeOnOverlayClick = {false}
            styles = {{ closeButton: { outline: 'none' } }}
            onClose = {onClose}
        >
            <Container>
                <Formik
                    initialValues = {{ teamName: '' }}
                    onSubmit = {async ({ teamName }) => {
                        if(teamName.trim().length === 0) {
                            return;
                        }

                        await createTeam({ 
                            variables: { teamName }
                        });

                        onClose();
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form>
                            <Header>Create New Team</Header>

                            <Input
                                type = 'text'
                                onChange = {handleChange}
                                placeholder = 'New Team Name'
                                value = {values.teamName}
                                name = 'teamName'
                            />

                            <Footer>
                                <Close onClick={onClose}>
                                    Close
                                </Close>

                                <Submit type='submit'>
                                    Save
                                </Submit>
                            </Footer>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Modal>
    )
}

export default CreateTeamModal;