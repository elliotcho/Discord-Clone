import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import Teams from '../components/view-teams/Teams';
import Channels from '../components/view-teams/Channels';
import ChatHeader from '../components/view-teams/ChatHeader';
import ChatContainer from '../components/view-teams/ChatContainer';
import SendMessage from '../components/view-teams/SendMessage';

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
    return (
        <Container>
            <Teams />

            <Channels />

            <Chat>
                <ChatHeader />

                <ChatContainer />

                <SendMessage />
            </Chat>
        </Container>
    )
}

export default withApollo({ ssr: false })(ViewTeams);