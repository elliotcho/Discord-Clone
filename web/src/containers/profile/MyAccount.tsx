import React from 'react';
import styled from 'styled-components';
import ProfileCard from '../../components/profile/ProfileCard';

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

const MyAccount: React.FC<{}> = () => {
    return (
        <Container>
            <Wrapper>
                <Header>MY ACCOUNT</Header>

                <ProfileCard />
            </Wrapper>
        </Container>
    )
}

export default MyAccount;