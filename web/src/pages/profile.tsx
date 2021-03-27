import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import ProfileContainer from '../containers/profile/ProfileContainer';
import Teams from '../components/shared/Teams';
import AuthWrapper from '../containers/shared/AuthWrapper';

const Container = styled.div`
    height: 100vh;
    grid-template-columns: 100px 250px 1fr;
    display: grid;
`;

const Profile: React.FC<{}> = () => {
    return (
        <AuthWrapper requiresAuth>
            <Container>
                <Teams />

                <div style={{background: '#1a1c20'}}>
                    HELLO
                </div>

                <ProfileContainer /> 
            </Container>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(Profile);