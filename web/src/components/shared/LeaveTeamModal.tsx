import React from 'react';
import styled from 'styled-components';
import {Formik, Form} from 'formik';
import {Modal} from 'react-responsive-modal';
import { useLeaveTeamMutation } from '../../generated/graphql';
import 'react-responsive-modal/styles.css';

const Container = styled.div`
    width: 400px;
    `;

const Header = styled.h2``;

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
    `
interface LeaveTeamModalProps {
    teamId: number
    isOpen: boolean;
    onClose(): void;
}

const LeaveTeamModal : React.FC<LeaveTeamModalProps> = ({ teamId, isOpen, onClose }) => {
    const [leaveTeam] = useLeaveTeamMutation();

    return(
        <Modal
            open = {isOpen}
            closeOnEsc = {false}
            closeOnOverlayClick = {false}
            styles = {{closeButton: {outline: 'none'}}}
            onClose = {onClose}
        >
                <Container>
                    <Formik
                        enableReinitialize
                        initialValues={{ teamId }}
                        onSubmit = {async ({ teamId }) =>{
                            await leaveTeam({
                                variables: { teamId }
                            });

                            onClose();
                        }}
                >
                        <Form>
                            <Header>
                                Are you sure you want to leave this team?
                            </Header>
                            
                            <Footer>
                                    <Close onClick={onClose}>
                                        Close
                                    </Close>

                                    <Submit type='submit'>
                                        Leave Team
                                    </Submit>
                            </Footer>
                        </Form>
                    </Formik>
                </Container>
        </Modal>
    )
}

export default LeaveTeamModal;