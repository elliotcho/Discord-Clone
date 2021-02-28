import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import ProfileContainer from '../containers/profile/ProfileContainer';
import Teams from '../components/shared/Teams';

const Container = styled.div`
    height: 100vh;
    grid-template-columns: 100px 250px 1fr;
    display: grid;
`;

const Profile: React.FC<{}> = () => {
    return (
        <Container>
            <Teams />

            <div style={{background: 'pink'}}>
                HELLO
            </div>

            <ProfileContainer />
        </Container>
    )
}

export default withApollo({ ssr: false })(Profile);