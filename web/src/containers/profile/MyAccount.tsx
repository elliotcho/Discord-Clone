import React from 'react';
import styled from 'styled-components';
import ProfileCard from '../../components/profile/ProfileCard';
import ChangeUsername from '../../components/profile/ChangeUsername';
import ChangeEmail from '../../components/profile/ChangeEmail';

const Container = styled.div`
    background: #4d4d4d;
    min-width: 650px;
`;

const Wrapper = styled.div`
    margin: 50px auto;
    max-width: 600px;
`;

const Header = styled.h3`
    color: #f2f2f2;
`;

interface MyAccountProps{
    username: string;
    email: string;
}

const MyAccount: React.FC<MyAccountProps> = ({ username, email }) => {
 
    return (
        <Container>
            <Wrapper>
                <Header>MY ACCOUNT</Header>
                
                <ProfileCard />
               
                <ChangeUsername username={username} />

                <ChangeEmail email={email}/>
            </Wrapper>
        </Container>
    )
}

export default MyAccount;