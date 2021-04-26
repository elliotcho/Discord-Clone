import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCreateChannelMutation, useVoiceChannelsQuery } from '../../generated/graphql';
import VoiceChannel from '../../components/view-team/VoiceChannel';
import EditModal from '../../components/shared/EditModal';

const Container = styled.div`
    margin-top: 30px;
`;

const Flex = styled.div`
    border-bottom: 1px solid #000;
    display: flex;
`;

const Title = styled.h4`
    margin: 10px 0 10px 5px;
    color: #999;
`;

const Box = styled.div`
    margin: 5px 5px 0 auto;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;

    &:hover {
        color: #ccc;
    }
`;

interface VoiceChannelsProps {
    teamId: number;
    isOwner: boolean;
}

const VoiceChannels: React.FC<VoiceChannelsProps> = ({ 
    isOwner,
    teamId
}) => {
    const [openCreateChannel, setOpenCreateChannel] = useState(false);
    const [createChannel] = useCreateChannelMutation();

    const { data } = useVoiceChannelsQuery({
        variables: { teamId },
        skip: !teamId
    });

    return (
        <Container>
            <Flex>
                <Title>Voice Channels</Title>

                {isOwner && (
                    <Box
                        onClick = {() => {
                            setOpenCreateChannel(true);
                        }}
                    >
                        +
                    </Box>
                )}
            </Flex>

            {data?.voiceChannels?.map(c => {
                return (
                    <VoiceChannel 
                        key = {c.id}
                        channelId = {c.id}
                        {...c}
                    />
                ) 
            })} 

            <EditModal
                size = 'sm'
                title = 'Create Voice Channel'
                isOpen = {openCreateChannel}
                onClose = {() => setOpenCreateChannel(false)}
                onSave = {async (channelName) => {
                    await createChannel({ 
                        variables: { channelName, isVoice: true, teamId },
                        update: (cache) => {
                            cache.evict({ fieldName: "voiceChannels" });
                        }
                    });
                }}
            />
        </Container>
    )
}

export default VoiceChannels;