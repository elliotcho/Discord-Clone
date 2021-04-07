import React from 'react';
import { withApollo } from '../utils/withApollo';
import ProfileLayout from '../containers/profile/ProfileLayout';
import AuthWrapper from '../containers/shared/AuthWrapper';

const Profile: React.FC<{}> = () => {
    return (
        <AuthWrapper requiresAuth>
            <ProfileLayout />
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Profile);