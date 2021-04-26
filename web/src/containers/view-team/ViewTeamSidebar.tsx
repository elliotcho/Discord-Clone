import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { isServer } from '../../utils/isServer';
import TextChannels from './TextChannels';
import InvitePeopleModal from '../../components/view-team/InvitePeopleModal';
import UserNav from '../../components/shared/UserNav';
import NextLink from 'next/link';

const Container = styled.div`
    position: relative;
    background #333;
`;

const Flex = styled.div`
    border-bottom: 1px solid #000;
    display: flex;
    color: #ccc;
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

interface ViewTeamSidebarProps {
    teamId: number;
    channelId: number;
    teamName: string;
    isOwner: boolean;
}

const ViewTeamSidebar: React.FC<ViewTeamSidebarProps> = ({ 
    teamId, 
    channelId,
    teamName,
    isOwner
}) => {
    const teamSettingsRoute = `/team-settings/${teamId}`;

    const [invitePeople, setInvitePeople] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
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
                <Title>{teamName || 'Loading...'}</Title>

                <Box onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon id='chevron' icon={faChevronDown} />

                    {isOpen && (
                        <Dropdown id='channel-dropdown'>
                            {isOwner && (
                                <>
                                    <Option onClick={() => setInvitePeople(true)}>
                                        Invite People
                                    </Option>
                                </>
                            )}

                            <NextLink href={teamSettingsRoute}>
                                <Option>
                                    Team Settings
                                </Option>
                            </NextLink>
                        </Dropdown>
                    )}
                </Box>
            </Flex>

            <TextChannels
                isOwner = {isOwner}
                channelId = {channelId}
                teamId = {teamId}
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

export default ViewTeamSidebar;