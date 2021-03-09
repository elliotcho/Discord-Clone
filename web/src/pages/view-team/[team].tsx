import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../../utils/withApollo';
import { useTeamQuery } from '../../generated/graphql';
import Teams from '../../components/shared/Teams';
import Channels from '../../components/view-team/Channels';
import ChatHeader from '../../components/view-team/ChatHeader';
import ChatContainer from '../../components/view-team/ChatContainer';
import SendMessage from '../../components/view-team/SendMessage';
import AuthWrapper from '../../components/shared/AuthWrapper';
import { useRouter } from 'next/router';

const Container = styled.div`
    height: 100vh;
    grid-template-columns: 100px 250px 1fr;
    display: grid;
`;

const Chat = styled.div`
    display: grid;
    grid-template-rows: 1fr 8.5fr auto;
    grid-row-gap: 0;
`;

const ViewTeams: React.FC<{}> = () => {
    const router = useRouter();
    
    let team = router.query.team as string;
    let channel = router.query.channel as string;
    let teamId = parseInt(team);
    let channelId = -1;

    const { data } = useTeamQuery({
        variables: { teamId }
    });

    if(!channel) {
        channelId = data?.team?.channels[0].id;
    } else {
        channelId = parseInt(channel);
    }

    return (
        <AuthWrapper requiresAuth>
            <Container>
                <Teams />

                <Channels teamId={teamId} channelId={channelId}/>

                <Chat>
                    <ChatHeader />

                    <ChatContainer channelId={channelId}/>

                    <SendMessage channelId={channelId}/>
                </Chat>
            </Container>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(ViewTeams);