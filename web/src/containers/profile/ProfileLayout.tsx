import React from 'react';
import styled from 'styled-components';
import EscapeColumn from '../shared/EscapeColumn';
import Sidebar from './ProfileSidebar';
import MyAccount from './MyAccount';

const Container = styled.div`
    display: grid;
    grid-template-columns: 350px auto 250px;
    overflow-x: hidden;
    height: 100vh;
`;

const ProfileLayout : React.FC<{}> =() => {
    return (
        <Container>
            <Sidebar />
            
            <>
                <MyAccount />
            </>

            <EscapeColumn />
        </Container>
    )
}

export default ProfileLayout;