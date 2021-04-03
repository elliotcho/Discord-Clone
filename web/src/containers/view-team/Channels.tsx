import React, { useState } from 'react';
import styled from 'styled-components';
import {Formik} from 'formik';
import { useChannelsQuery, useDeleteChannelMutation, useAddUserToTeamMutation } from '../../generated/graphql';
import CreateChannelModal from '../../components/view-team/CreateChannelModal';
import NextLink from 'next/link';

const Container = styled.div`
    background #333;
`;

const Flex = styled.div`
    display: flex;
    color: gray;
`;

const Title = styled.h3`
    padding: 2px;
    padding-left: 10px;
`;

const Box = styled.div`
    margin-left: auto;
    font-size: 1.4rem;
    margin-top: 18px;
    cursor: pointer;
    position: relative;
    right: 15px;
    &:hover {
        color: white;
    }
`;

const Channel = styled.div`
    padding: 5px;
    padding-left: 10px;
    display: flex;
    cursor: pointer;
    color: white;
    &:hover {
        background: #808080;
    }
`;

const Options = styled.div`
    margin-left: auto;
`;

interface ChannelsProps {
    teamId: number;
    channelId: number;
}

async function invite(teamId) {
    useAddUserToTeamMutation(teamId);
}



const Channels: React.FC<ChannelsProps> = ({ teamId, channelId }) => {
    const [isOpen, setIsOpen] = useState(false);
    let settingOption = "";
    const [deleteChannel] = useDeleteChannelMutation();

    const { data } = useChannelsQuery({
        variables: { teamId }
    });

    const active = { background: '#808080' };

    return (
        <Container>
            <Flex>
                <Title>Text Channels</Title>
                <Box>
                <select value={settingOption} name="choice" onChange = { (e) => {
                    if(e.target.value === "invite"){
                        invite(teamId)
                    } 
                    if(e.target.value === "delete"){
                        //delete()
                    }
                    if(e.target.value === "new channel"){
                        setIsOpen(true);
                    }
                } }>
                    <option value="" label="Settings"/>
                    <option value="invite" label="Invite Friends"/>
                    <option value="delete" label="Leave Team"/>
                    <option value="new channel" label="Create New Channel"/>
                </select>
                </Box>
                

            </Flex>

            {data?.channels?.map((c, i) => {
                let style = {};
                let route = `/view-team/${teamId}/${c.id}`;

                if((i === 0 && channelId === -1) || (channelId === c.id)) {
                    style = active;
                } 

                return (
                    <NextLink key={c.id} href={route}>
                        <Channel style={style}>
                            # {c.name}
                           
                           {data?.channels.length > 1 && (
                                <Options
                                    onClick = {async () => {
                                        await deleteChannel({
                                            variables: { channelId },
                                            update: (cache) => {
                                                cache.evict({ fieldName: 'channels' });
                                            }
                                        })
                                    }}
                                >
                                    X
                                </Options>
                           )}
                        </Channel> 
                    </NextLink>
                )   
            })} 

            <CreateChannelModal
                isOpen = {isOpen}
                onClose = {() => setIsOpen(false)}
                teamId = {teamId}
            />
        </Container>
    )
}

export default Channels;