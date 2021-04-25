import React, { useState } from 'react';
import styled from 'styled-components';
import ChannelInviteeModal from './ChannelInviteeModal';

const Container = styled.div`
    margin-top: 50px;
`;

const Title = styled.div`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Wrapper = styled.div`
    display: flex;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    background: #262626;
    min-height: 100px;
    padding: 12px;
`;

interface ChannelMemberSettingsProps {
    isPrivate: boolean;
    channelId: number;
    isOwner: boolean;
    name: string;
}

const ChannelMemberSettings: React.FC<ChannelMemberSettingsProps> = ({
    name,
    channelId,
    isPrivate,
    isOwner,
}) => {
    const [openInvitees, setOpenInvitees] = useState(false);

    return (
        <Container>
            <Title>Members</Title>

            <Wrapper>
                
            </Wrapper>

            <ChannelInviteeModal
                isOpen = {openInvitees}
                onClose = {() => setOpenInvitees(false)}
                channelId = {channelId}
            />
        </Container>
    )
}

export default ChannelMemberSettings;