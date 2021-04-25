import React from 'react';
import styled from 'styled-components';
import { useChannelQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import AuthWrapper from '../../containers/shared/AuthWrapper';
import Sidebar from '../../containers/channel-settings/ChannelSidebar';
import Overview from '../../containers/channel-settings/ChannelOverview';
import EscapeColumn from '../../containers/shared/EscapeColumn';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: grid;
    grid-template-columns: 350px auto 250px;
    overflow-x: hidden;
    height: 100vh;
`;

const ChannelSettings : React.FC<{}> =() => {
    const router = useRouter();
    let channel = router.query.id as string;
    let channelId = parseInt(channel);

    const { data } = useChannelQuery({
        variables: { channelId },
        skip: !channelId
    });

    const isOwner = !!data?.channel?.isOwner;
    const name = data?.channel?.name || 'Loading...';
    const isOriginal = !!data?.channel?.isOriginal;
    const isPrivate = !!data?.channel?.isPrivate;
    const teamId = data?.channel?.teamId || -1;

    return (
        <AuthWrapper requiresAuth>
             <Container>
                <Sidebar 
                    isOwner = {isOwner}
                    isOriginal={isOriginal}
                    channelId={channelId} 
                    teamId={teamId}
                />
                
                <>
                    <Overview 
                        isOwner = {isOwner}
                        channelId={channelId} 
                        isPrivate = {isPrivate}
                        isOriginal = {isOriginal}
                        teamId={teamId}
                        name={name}
                    />
                </>

                <EscapeColumn />
            </Container>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(ChannelSettings);