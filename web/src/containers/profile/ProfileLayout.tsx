import React from 'react';
import styled from 'styled-components';
import ProfileContainer from './ProfileContainer';

const Container = styled.div`
    display: grid;
    grid-template-columns: 350px auto;
    height: 100vh;
`;

const ProfileLayout : React.FC<{}> =() => {
    return (
        <Container>
            <div style={{
                background: 'black'
            }}>

            </div>


            <ProfileContainer />
        </Container>
    )
}

export default ProfileLayout;