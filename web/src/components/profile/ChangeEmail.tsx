import React, { useState } from 'react';
import styled from 'styled-components';
import { useChangeEmailMutation } from '../../generated/graphql';
import EditModal from '../shared/EditModal';

const Container = styled.div`
    margin-top: 30px;
`;

const Title = styled.h3`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Flex = styled.div`
    display: flex;
    background: #333;
    align-items: center;
    color: #f2f2f2;
    padding: 12px;
`;

const Box = styled.div`
    margin-left: auto; 
`;

const Button = styled.button`
    border: none;
    cursor: pointer;
    font-size: 1.0rem;
    background: #6c757d;
    color: #f2f2f2;
    outline: none;
    padding: 5px;

    &:hover {
        background: #999;
    }
`;

interface ChangeEmailProps {
    email: string;
}

const ChangeEmail : React.FC<ChangeEmailProps> = ({ email }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [changeEmail] = useChangeEmailMutation();

    return (
        <Container>
            <Title>change email</Title>
            
            <Flex>
                {email}
                
                <Box>
                    <Button
                        onClick={() => setIsOpen(true)}
                    >
                        Edit Email
                    </Button>
                </Box>
            </Flex>

            <EditModal
                size = 'sm'
                isOpen = {isOpen}
                content = {email}
                title = 'Edit your email'
                onClose = {() => setIsOpen(false)}
                onSave = {async (newEmail: string) => {
                    await changeEmail({
                        variables : {newEmail},
                        update: (cache) => {
                            cache.evict({ fieldName: 'me' });
                        }
                    });
                }}
            />
        </Container>
    )
}

export default ChangeEmail;