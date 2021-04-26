import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
    useCreateChannelMutation, 
    useSeeTeamMessagesMutation,
    useChannelsQuery
} from '../../generated/graphql';
import EditModal from '../../components/shared/EditModal';
import TextChannel from '../../components/view-team/TextChannel';

const Container = styled.div`
    margin-top: 15px;
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

interface TextChannelsProps {
    teamId: number;
    channelId: number;
    isOwner: boolean;
}

const TextChannels: React.FC<TextChannelsProps> = ({ 
    channelId,
    isOwner,
    teamId
}) => {
    const [openCreateChannel, setOpenCreateChannel] = useState(false);
    const [seeTeamMessages] = useSeeTeamMessagesMutation();
    const [createChannel] = useCreateChannelMutation();

    const { data } = useChannelsQuery({
        variables: { teamId },
        skip: !teamId
    });

    useEffect(() => {
        const onMount = async () => {
            if(teamId) {
                await seeTeamMessages({
                    variables: { teamId },
                    update: (cache) => {
                        cache.evict({ fieldName: 'teams' });
                    }
                });
            }
        }

        onMount();
    }, [data]);

    return (
        <Container>
            <Flex>
                <Title>Text Channels</Title>

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

            {data?.channels?.map((c, i) => {
                let active = false;

                if((i === 0 && channelId === -1) || (channelId === c.id)) {
                    active = true;
                }

                return (
                    <TextChannel 
                        key = {c.id}
                        active = {active}
                        channelId = {c.id}
                        teamId = {teamId}
                        {...c}
                    />
                ) 
            })} 

            <EditModal
                size = 'sm'
                title = 'Create Text Channel'
                isOpen = {openCreateChannel}
                onClose = {() => setOpenCreateChannel(false)}
                onSave = {async (channelName) => {
                    await createChannel({ 
                        variables: { channelName, teamId },
                        update: (cache) => {
                            cache.evict({ fieldName: "channels" });
                        }
                    });
                }}
            />
        </Container>
    )
}

export default TextChannels;