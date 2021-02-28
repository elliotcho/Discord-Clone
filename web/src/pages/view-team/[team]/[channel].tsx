import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../../../utils/withApollo';
import Teams from '../../../components/shared/Teams';
import Channels from '../../../components/view-team/Channels';
import ChatHeader from '../../../components/view-team/ChatHeader';
import ChatContainer from '../../../components/view-team/ChatContainer';
import SendMessage from '../../../components/view-team/SendMessage';
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
    const { query: { team, channel } } = useRouter();
    
    let teamId = -1;
    let channelId = -1;

    if(typeof team === 'string') {
        teamId = parseInt(team);
    }

    if(typeof channel === 'string') {
        channelId = parseInt(channel);
    }

    return (
        <Container>
            <Teams />

            <Channels teamId={teamId} channelId={channelId}/>

            <Chat>
                <ChatHeader />

                <ChatContainer />

                <SendMessage />
            </Chat>
        </Container>
    )
}

export default withApollo({ ssr: false })(ViewTeams);