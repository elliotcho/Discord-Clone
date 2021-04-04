import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    useChannelsQuery, 
    useDeleteChannelMutation, 
    useAddUserToTeamMutation, 
    useDeleteTeamMutation 
} from '../../generated/graphql';
import CreateChannelModal from '../../components/view-team/CreateChannelModal';
import LeaveTeamModal from '../../components/shared/LeaveTeamModal';
import NextLink from 'next/link';
import DeleteTeamModal from '../../components/shared/DeleteTeamModal';

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

const Channels: React.FC<ChannelsProps> = ({ teamId, channelId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const[openLeaveChannel, setLeaveChannel] = useState(false);
    const[openDelete, setDelete] = useState(false);

    let settingOption = "";
    
    const [deleteChannel] = useDeleteChannelMutation();
    const [deleteTeam] = useDeleteTeamMutation();
    const [addUser] = useAddUserToTeamMutation();

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
                        //invite(teamId)
                        //setInvite(true);
                    } 
                    if(e.target.value === "leave"){
                        setLeaveChannel(true);
                        
                    }
                    if(e.target.value === "new channel"){
                        setIsOpen(true);
                    }
                    //next option should only appear for the Team Owner!
                    if(e.target.value === "delete"){
                        setDelete(true);
                    }
                } }>
                    <option value="" label="Settings"/>
                    <option value="invite" label="Invite Friends"/>
                    <option value="leave" label="Leave Team"/>
                    <option value="new channel" label="Create New Channel"/>
                    <option value="delete" label="Delete Team"/>
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

            <LeaveTeamModal
                isOpen = {openLeaveChannel}
                onClose = {()=> setLeaveChannel(false)}
                teamId = {teamId}
            />

            <DeleteTeamModal
                isOpen = {openDelete}
                onClose = {()=> setDelete(false)}
                teamId = {teamId}
                />
        </Container>
    )
}

export default Channels;