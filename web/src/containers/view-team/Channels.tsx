import React from 'react';
import styled from 'styled-components';
import { useChannelsQuery } from '../../generated/graphql';
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

interface ChannelsProps {
    teamId: number;
    channelId: number;
}

const Channels: React.FC<ChannelsProps> = ({ teamId, channelId }) => {
    const { data } = useChannelsQuery({ variables: { teamId } });

    return (
        <Container>
            <Flex>
                <Title>Text Channels</Title>
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
                        isRead = {true}
                        channelId = {c.id}
                        active = {active}
                        route = {route}
                        {...c}
                    />
                ) 
            })} 
   
            <UserNav />
        </Container>
    )
}

export default Channels;