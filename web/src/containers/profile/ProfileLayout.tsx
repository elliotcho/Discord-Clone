import React from 'react';
import styled from 'styled-components';
import Sidebar from './ProfileSidebar';
import MyAccount from './MyAccount';

const Container = styled.div`
    display: grid;
    grid-template-columns: 350px auto;
    height: 100vh;
`;

const ProfileLayout : React.FC<{}> =() => {
    return (
        <Container>
            <Sidebar />
            
            <>
                <MyAccount />
            </>
        </Container>
    )
}

export default ProfileLayout;