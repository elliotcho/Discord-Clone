import React from 'react';
import styled from 'styled-components';
import ChannelName from '../../components/channel-settings/ChannelName';
import DeleteChannel from '../../components/channel-settings/DeleteChannel';

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
    teamId: number;
    name: string;
}

const ChannelOverview: React.FC<ChannelOverviewProps> = ({
    isOwner,
    channelId, 
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

                <DeleteChannel 
                    isOwner = {isOwner}
                    channelId = {channelId}
                    teamId = {teamId}
                    name = {name}
                />
            </Wrapper>
        </Container>
    )
}

export default ChannelOverview;