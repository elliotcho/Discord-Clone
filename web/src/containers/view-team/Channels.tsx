import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    useChannelsQuery,
    useDeleteTeamMutation,
    useLeaveTeamMutation
} from '../../generated/graphql';
import CreateChannelModal from '../../components/view-team/CreateChannelModal';
import ConfirmModal from '../../components/shared/ConfirmModal';
import Channel from '../../components/view-team/Channel';
import UserNav from '../../components/shared/UserNav';
import { useRouter } from 'next/router';

const Container = styled.div`
    position: relative;
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

interface ChannelsProps {
    teamId: number;
    channelId: number;
}

const Channels: React.FC<ChannelsProps> = ({ teamId, channelId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const[openLeaveChannel, setLeaveChannel] = useState(false);
    const[openDelete, setDelete] = useState(false);
    const router = useRouter();

    const { data } = useChannelsQuery({ variables: { teamId } });
    const [deleteTeam] = useDeleteTeamMutation();
    const [leaveTeam] = useLeaveTeamMutation();

    let settingOption = "";

 

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
                let numChannels = data?.channels?.length;
                let route = `/view-team/${teamId}/${c.id}`;
                let active = false;

                if((i === 0 && channelId === -1) || (channelId === c.id)) {
                    active = true;
                } 

                return (
                    <Channel 
                        key = {c.id}
                        isRead = {c.read}
                        channelId = {c.id}
                        numChannels = {numChannels}
                        active = {active}
                        route = {route}
                        {...c}
                    />
                ) 
            })} 

            <CreateChannelModal
                isOpen = {isOpen}
                onClose = {() => setIsOpen(false)}
                teamId = {teamId}
            />

            <ConfirmModal
                isOpen = {openLeaveChannel}
                onClose = {() => setLeaveChannel(false)}
                title =  'Are you sure you want to leave this team?'
                onSave ={async () => {
                    const result = await leaveTeam({
                        variables: { teamId },
                        update: (cache) => {
                            cache.evict({ fieldName: "teams"});
                        }
                    });

                    if(result.data.leaveTeam){
                        router.push('/profile')
                    }
                }}
            />

            <ConfirmModal
                isOpen = {openDelete}
                onClose = {() => setDelete(false)}
                title = 'Are you sure you want to permanently delete this team?'
                onSave = {async () => {
                    const result =  await deleteTeam({
                        variables: { teamId },
                        update: (cache) => {
                            cache.evict({ fieldName: "teams"})
                        }
                    });

                    if (result.data.deleteTeam){
                        router.push('/profile')
                    }
                }}
            />
            
            <UserNav />
        </Container>
    )
}

export default Channels;