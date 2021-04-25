import React from 'react';
import styled from 'styled-components';
import ChannelName from '../../components/channel-settings/ChannelName';
import TogglePrivacy from '../../components/channel-settings/TogglePrivacy';

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
    isPrivate: boolean;
    teamId: number;
    name: string;
}

const ChannelOverview: React.FC<ChannelOverviewProps> = ({
    isOwner,
    channelId, 
    isPrivate,
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
                    isPrivate = {isPrivate}
                    isOwner = {isOwner}
                />
            </Wrapper>
        </Container>
    )
}

export default ChannelOverview;