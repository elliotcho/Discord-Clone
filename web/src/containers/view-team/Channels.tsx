import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useChannelsQuery, useCreateChannelMutation } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import InvitePeopleModal from '../../components/view-team/InvitePeopleModal';
import EditModal from '../../components/shared/EditModal';
import Channel from '../../components/view-team/Channel';
import UserNav from '../../components/shared/UserNav';

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
    margin: 20px 15px 0 auto;
    cursor: pointer;
`;

const Dropdown = styled.div`
    z-index: 1;
    min-width: 160px;
    position: absolute;
    background: #000;
    color: white;
    box-shadow: 0 0 5px black;
    right: 15px;
    top: 45px;
`;

const Option = styled.div`
    margin: 12px;
    display: flex;
    padding: 10px 20px;
    font-weight: normal;
    font-size: 1rem;
    &:hover {
        background: #9999ff;
        color: #f2f2f2;
    }
`;

interface ChannelsProps {
    teamId: number;
    channelId: number;
}

const Channels: React.FC<ChannelsProps> = ({ teamId, channelId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openCreateChannel, setOpenCreateChannel] = useState(false);
    const [invitePeople, setInvitePeople] = useState(false);
    const [createChannel] = useCreateChannelMutation();

    const { data } = useChannelsQuery({ 
        variables: { teamId },
        skip: !teamId
    });

    if(!isServer()) {
        window.addEventListener('click', function(e: any){
            if(!document.getElementById('channel-dropdown')?.contains(e.target)
                && !document.getElementById('chevron')?.contains(e.target)
            ) {
                setIsOpen(false);
            }
        });
    }

    return (
        <Container>
            <Flex>
                <Title>Text Channels</Title>

                <Box onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon id='chevron' icon={faChevronDown} />

                    {isOpen && (
                        <Dropdown id='channel-dropdown'>
                            <Option onClick={() => setOpenCreateChannel(true)}>
                                Create Channel
                            </Option>

                            <Option onClick={() => setInvitePeople(true)}>
                                Invite People
                            </Option>
                        </Dropdown>
                    )}
                </Box>
            </Flex>

            {data?.channels?.map((c, i) => {
                let route = `/view-team/${teamId}/${c.id}`;
                let active = false;

                if((i === 0 && channelId === -1) || (channelId === c.id)) {
                    active = true;
                } 

                return (
                    <Channel 
                        key = {c.id}
                        active = {active}
                        route = {route}
                        {...c}
                    />
                ) 
            })} 

            <EditModal
                size = 'sm'
                title = 'Create Channel'
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

            <InvitePeopleModal
                isOpen = {invitePeople}
                onClose = {() => setInvitePeople(false)}
                teamId = {teamId}
            />
   
            <UserNav />
        </Container>
    )
}

export default Channels;