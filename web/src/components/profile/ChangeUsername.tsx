import React, { useState } from 'react';
import styled from 'styled-components';
import { useChangeUsernameMutation } from '../../generated/graphql';
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

interface ChangeUsernameProps {
    username: string;
}

const ChangeUsername : React.FC<ChangeUsernameProps> = ({ username }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [changeUsername] = useChangeUsernameMutation()
    
    return (
        <Container>
            <Title>change username</Title> 
            
            <Flex>
                {username}

                <Box>
                    <Button
                        onClick = {() => {
                            setIsOpen(true);
                        }}
                    >
                        Edit Username
                    </Button>
                </Box>
            </Flex>

            <EditModal
                size = 'sm'
                isOpen = {isOpen}
                content = {username}
                title = 'Edit your username'
                onClose = {() => setIsOpen(false)}
                onSave = {async (newUsername: string) => {
                    await changeUsername({
                        variables: { username: newUsername },
                        update: (cache) => {
                            cache.evict({ fieldName: 'me' });
                        }
                    });
                }}
            />
        </Container>
    )
}

export default ChangeUsername;