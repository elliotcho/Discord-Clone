import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import Layout from '../containers/shared/MainLayout';
import AuthWrapper from '../containers/shared/AuthWrapper';
import AddFriend from '../containers/friends/AddFriend';
import FriendsNav from '../components/friends/FriendsNav';
import { useRouter } from 'next/router';

const Container = styled.div`
    background: #595959;
`;

const Friends: React.FC<{}> =() => {
    const { query:  { type } } = useRouter();

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                <Container>
                    <FriendsNav />

                    {type === 'search' && <AddFriend />}
                </Container>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Friends);