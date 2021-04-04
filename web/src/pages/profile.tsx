import React from 'react';
import { withApollo } from '../utils/withApollo';
import Layout from '../containers/shared/MainLayout';
import ProfileContainer from '../containers/profile/ProfileContainer';
import AuthWrapper from '../containers/shared/AuthWrapper';

const Profile: React.FC<{}> = () => {
    return (
        <AuthWrapper requiresAuth>
            <Layout>
                <ProfileContainer />
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Profile);