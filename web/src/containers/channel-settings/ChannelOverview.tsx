import React from 'react';
import styled from 'styled-components';
import ChannelName from '../../components/channel-settings/ChannelName';
import TogglePrivacy from '../../components/channel-settings/TogglePrivacy';
import MemberSettings from '../../components/channel-settings/ChannelMemberSettings';
import ChannelMetrics from '../../components/channel-settings/ChannelMetrics';

const Container = styled.div`
    background: #4d4d4d;
    min-width: 650px;
`;

const Wrapper = styled.div`
    margin: 50px auto;
    max-width: 600px;
`;

const Header = styled.h3`
    color: #f2f2f2;
`;

interface ChannelOverviewProps {
    isOwner: boolean;
    channelId: number;
    isOriginal: boolean;
    numMessages: number;
    numMembers: number;
    isPrivate: boolean;
    createdAt: string;
    teamId: number;
    name: string;
}

const ChannelOverview: React.FC<ChannelOverviewProps> = ({
    isOwner,
    channelId,
    isOriginal, 
    numMessages,
    numMembers,
    isPrivate,
    createdAt,
    teamId,
    name
}) => {
    return (
        <Container>
            <Wrapper>
                <Header>Overview</Header>

                <ChannelName 
                    isOwner = {isOwner}
                    channelId = {channelId}
                    teamId = {teamId}
                    name = {name}
                />

                <TogglePrivacy
                    channelId = {channelId}
                    isOriginal = {isOriginal}
                    isPrivate = {isPrivate}
                    isOwner = {isOwner}
                />

                <ChannelMetrics
                    numMembers = {numMembers}
                    numMessages = {numMessages}
                    createdAt = {createdAt}
                />

                <MemberSettings
                    channelId = {channelId}
                    isPrivate = {isPrivate}
                    isOwner = {isOwner}
                    name = {name}
                />
            </Wrapper>
        </Container>
    )
}

export default ChannelOverview;