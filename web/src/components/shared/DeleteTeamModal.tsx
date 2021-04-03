import React from 'react';
import styled from 'styled-components';
import {Formik, Form} from 'formik';
import {Modal} from 'react-responsive-modal';
import {useDeleteTeamMutation} from '../../generated/graphql';
import 'react-responsive-modal/styles.css';
import {useRouter} from 'next/router';

const Container = styled.div`
    width: 400px;
    `;

const Header = styled.h2``;

const Input = styled.input`
    padding: 7px:
    margin-bottom: 20px;
    width: 90%;
    `

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
interface DeleteTeamModal {
    teamId: number
    isOpen: boolean;
    onClose(): void;
}

const DeleteTeamModal : React.FC<DeleteTeamModal> = ({teamId, isOpen, onClose }) => {
    const [deleteTeam] = useDeleteTeamMutation();
    const router = useRouter();

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
                           const result =  await deleteTeam({
                                variables: { teamId },
                                update: (cache) => {
                                    cache.evict({ fieldName: "teams"})
                                }
                            });

                            onClose();

                            if (result.data.deleteTeam){
                                router.push('/profile')
                            }
                        }}
                >
                    <Form>
                        <Header>
                            Are you sure you want to permanently delete this team?
                        </Header>

                        <Footer>
                                <Close onClick={onClose}>
                                    Close
                                </Close>

                                <Submit type='submit'>
                                    Delete Team
                                </Submit>
                        </Footer>
                    </Form>
                    </Formik>
                </Container>
        </Modal>
    )
}

export default DeleteTeamModal;