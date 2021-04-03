import React from 'react';
import styled from 'styled-components';
import { useFriendsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import Layout from '../containers/shared/MainLayout';
import AuthWrapper from '../containers/shared/AuthWrapper';
import FriendsNav from '../components/friends/FriendsNav';

const Container = styled.div`
    background: #595959;
`;

const Friends: React.FC<{}> =() => {
    return (
        <AuthWrapper requiresAuth>
            <Layout>
                <Container>
                    <FriendsNav />
                </Container>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Friends);