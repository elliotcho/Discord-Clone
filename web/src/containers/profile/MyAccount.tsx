import React from 'react';
import styled from 'styled-components';
import ProfileCard from '../../components/profile/ProfileCard';
import {useChangeUsernameMutation} from '../../generated/graphql';

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

const Title = styled.h3`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Flex = styled.div`
    display: flex;
    background: #333;
    align-items: center;
    color: #f2f2f2;
    padding: 12px;
`;

const Box = styled.div`
    margin-left: auto; 
`;

const Button = styled.button`
    border: none;
    cursor: pointer;
    font-size: 1.0rem;
    background: #6c757d;
    color: #f2f2f2;
    outline: none;
    padding: 5px;

    &:hover {
        background: #999;
    }
    
`;

interface MyAccountProps{
    username: string;
    email: string;
}

const MyAccount: React.FC<MyAccountProps> = ({username, email}) => {
    const [changeUsername] = useChangeUsernameMutation()

    return (
        <Container>
            <Wrapper>
                <Header>MY ACCOUNT</Header>
                <ProfileCard />
                <Title> username</Title> 
                <Flex>
                    <p>{username}</p>
                    <Box>
                        <Button>Edit</Button>
                    </Box>
                </Flex>
                <Title>email</Title>
                <Flex>
                    <p>{email}</p>
                    <Box>
                        <Button>Edit</Button>
                    </Box>
                </Flex>
            </Wrapper>
        </Container>
    )
}

export default MyAccount;