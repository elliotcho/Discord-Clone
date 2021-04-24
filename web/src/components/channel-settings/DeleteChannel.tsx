import React, { useState } from 'react';
import styled from 'styled-components';
import ConfirmModal from '../../components/shared/ConfirmModal';
import {  useDeleteChannelMutation, useChannelsQuery } from '../../generated/graphql';

const Container = styled.div`
    margin-top: 30px;
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
    background: #F10205;
    color: #f2f2f2;
    outline: none;

    &:hover {
        background: #999;
    }
`;


interface DeleteChannelProps {
    isOwner: boolean;
    channelId: number;
    teamId: number;
    name: string;
}

const DeleteChannel: React.FC<DeleteChannelProps> = ({
    isOwner,
    channelId,
    teamId,
    name
}) => {
    const[isOpen, setIsOpen] = useState(false);
    const [deleteChannel] = useDeleteChannelMutation();
    const { data } = useChannelsQuery({variables: {teamId}});
    const channels = data?.channels || [];
    const numOfChannels = channels.length
    let deletable = true;
    if(numOfChannels === 0 || numOfChannels === 1){
        deletable = false;
    }

    return(
        <Container>
        <Flex>
            Delete "{name}" 
            {isOwner && (
                <Box>
                    {deletable &&(
                    <Button
                            onClick = {() => {
                                
                                setIsOpen(true);
                                
                            }} 
                    >
                                Delete Channel
                    </Button>
                    )}
                </Box>
            )} 
        </Flex>

        <ConfirmModal
                     title= 'Delete Channel'
                     isOpen = {isOpen}
                     onClose = {() => setIsOpen(false)}
                     onSave = {async () => {
                            await deleteChannel({
                                variables: {channelId},
                                update: (cache) => {
                                    cache.evict({ fieldName: 'Channel'})
                                }
                            });
                     }}
            />
        </Container>
    )
}

export default DeleteChannel;

