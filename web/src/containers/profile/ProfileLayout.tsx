import React from 'react';
import styled from 'styled-components';
import {useMeQuery} from '../../generated/graphql';
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
    const {data} = useMeQuery()

    const username = data?.me?.username 
    const email = data?.me?.email

    return (
        <Container>
            <Sidebar />
            
            <>
                <MyAccount  username={username} email={email}/>
            </>

            <EscapeColumn />
        </Container>
    )
}

export default ProfileLayout;