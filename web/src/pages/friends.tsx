import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import Layout from '../containers/shared/MainLayout';
import AuthWrapper from '../containers/shared/AuthWrapper';
import FriendRequests from '../containers/friends/FriendRequests';
import AddFriend from '../containers/friends/AddFriend';
import Network from '../containers/friends/Network';
import FriendsNav from '../components/friends/FriendsNav';
import OnlineFriends from '../containers/friends/OnlineFriends';
import { useRouter } from 'next/router';

const Container = styled.div`
    background: #595959;
    height: 100%;
`;

const Friends: React.FC<{}> =() => {
    const { query:  { type } } = useRouter();

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                <Container>
                    <FriendsNav type={type}/>

                    {type === 'all' && <Network />}
                    {type === 'requests' && <FriendRequests />}
                    {type === 'search' && <AddFriend />}
                    {type === 'online' && <OnlineFriends />}
                </Container>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Friends);