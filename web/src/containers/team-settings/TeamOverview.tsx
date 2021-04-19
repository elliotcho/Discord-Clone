import React from 'react';
import styled from 'styled-components';
import TeamName from '../../components/team-settings/TeamName';

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

interface TeamOverviewProps {
    isOwner: boolean;
    teamId: number;
    name: string;
}

const ChannelOverview: React.FC<TeamOverviewProps> = ({
    isOwner,
    teamId,
    name
}) => {
    return (
        <Container>
            <Wrapper>
                <Header>Overview</Header>

                <TeamName
                    teamId = {teamId}
                    isOwner = {isOwner}
                    name = {name}
                />
            </Wrapper>
        </Container>
    )
}

export default ChannelOverview;