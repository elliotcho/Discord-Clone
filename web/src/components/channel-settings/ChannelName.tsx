import React, { useState } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { useEditChannelNameMutation } from '../../generated/graphql';
import EditModal from '../shared/EditModal';

const Container = styled.div`
    margin-top: 30px;
`;

const Title = styled.div`
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

    &:hover {
        background: #999;
    }
`;

interface ChannelNameProps {
    isOwner: boolean;
    channelId: number;
    teamId: number;
    name: string;
}

const ChannelName: React.FC<ChannelNameProps> = ({
    isOwner,
    channelId, 
    teamId,
    name
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editChannelName] = useEditChannelNameMutation();

    return (
        <Container>
            <Title>Channel Name</Title>

            <Flex>
                {name}

                {isOwner && (
                    <Box>
                        <Button
                            onClick = {() => {
                                setIsOpen(true);
                            }}
                        >
                            Edit Name
                        </Button>
                    </Box>
                )}
            </Flex>

            <EditModal
                size = 'sm'
                content = {name}
                isOpen = {isOpen}
                title = 'Edit channel name'
                onClose = {() => setIsOpen(false)}
                onSave = {async (newName: string) => {
                    await editChannelName({
                        variables: { channelId, teamId, newName },
                        update: (cache, { data }) => {
                            if(data?.editChannelName) {
                                cache.writeFragment({
                                    id: 'Channel:' + channelId,
                                    data: { name: newName },
                                    fragment: gql`
                                        fragment _ on Channel {
                                            name
                                        }
                                    `
                                });
                            }
                        }
                    });
                }}
            />
        </Container>
    )
}

export default ChannelName;