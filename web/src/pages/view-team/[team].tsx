import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../../utils/withApollo';
import { useTeamQuery } from '../../generated/graphql';
import AuthWrapper from '../../containers/shared/AuthWrapper';
import ChannelMemberWrapper from '../../containers/view-team/ChannelMemberWrapper';
import ChatHeader from '../../components/view-team/ChatHeader';
import ChatContainer from '../../containers/view-team/ChatContainer';
import SendMessage from '../../components/view-team/SendMessage';
import Members from '../../containers/view-team/Members';
import Sidebar from '../../containers/view-team/ViewTeamSidebar';
import Teams from '../../components/shared/Teams';
import { useRouter } from 'next/router';

const Container = styled.div`
    height: 100vh;
    grid-template-columns: 100px 250px 1fr 250px;
    overflow: hidden;
    display: grid;
`;

const Chat = styled.div`
    display: grid;
    grid-template-rows: 1fr 8.5fr auto;
    grid-row-gap: 0;
    overflow: auto;
`;

const ViewTeams: React.FC<{}> = () => {
    const router = useRouter();
    
    let team = router.query.team as string;
    let channel = router.query.channel as string;
    let teamId = parseInt(team);
    let channelId = -1;
    
    const { data } = useTeamQuery({
        variables: { teamId },
        skip: !teamId
    });

    if(!channel) {
        channelId = data?.team?.channels[0].id;
    } else {
        channelId = parseInt(channel);
    }

    return (
        <AuthWrapper requiresAuth>
            <ChannelMemberWrapper channelId={channelId}>
                <Container>
                    <Teams />

                    <Sidebar
                        isOwner = {!!data?.team?.isOwner}
                        teamName = {data?.team?.name}
                        channelId = {channelId} 
                        teamId = {teamId}
                    />

                    <Chat>
                        <ChatHeader channelId={channelId}/>

                        <ChatContainer channelId={channelId} />

                        <SendMessage channelId={channelId}/>
                    </Chat>

                    <Members teamId={teamId} />
                </Container>
            </ChannelMemberWrapper>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(ViewTeams);