import React, { useState } from 'react';
import styled from 'styled-components';
import ChannelInviteeModal from './ChannelInviteeModal';
import ChannelMembersModal from './ChannelMembersModal';

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

const ButtonStyles = `
    border: none;
    font-size: 1.2rem;
    margin-right: 30px;
    cursor: pointer;
    outline: none;
    color: #f2f2f2;
    padding: 5px;
`;  

const Primary = styled.button`
    ${ButtonStyles}
    background: #0275d8;

    &:hover {
        background: #0388fc;
    }
`;

const Success = styled.button`
    ${ButtonStyles}
    background: #5cb85c;

    &:hover {
        background: #33cc33;
    }
`

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
    const [openMembers, setOpenMembers] = useState(false);

    return (
        <Container>
            <Title>Members</Title>

            <Wrapper>
                <Primary
                    onClick = {() => {
                        setOpenMembers(true);
                    }}
                >
                    View Members
                </Primary>

                {isPrivate && isOwner && (
                    <Success
                        onClick = {() => {
                            setOpenInvitees(true);
                        }}
                    >
                        Invite People
                    </Success>
                )}
            </Wrapper>

            <ChannelInviteeModal
                isOpen = {openInvitees}
                onClose = {() => setOpenInvitees(false)}
                channelId = {channelId}
            />

            <ChannelMembersModal
                isOpen = {openMembers}
                onClose = {() => setOpenMembers(false)}
                isPrivate = {isPrivate}
                channelId = {channelId}
                isOwner = {isOwner}
                name = {name}
            />
        </Container>
    )
}

export default ChannelMemberSettings;