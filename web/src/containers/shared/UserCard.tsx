import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
    margin: 50px auto;
    background: white;
    max-width: 600px;
    padding: 15px;
    width: 90%;
`;

const Image = styled.img`
    cursor: pointer;
    width: 6rem;
    height: 6rem;
`;

const Primary = styled.h3`
    color: #0275d8;
    cursor: pointer;
    margin-left: 20px;
    &:hover {
        text-decoration: underline;
    }
`;

const Box = styled.div`
    margin-left: auto;
`;

interface UserCardProps {
    profileURL: string;
    username: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
    children, 
    profileURL, 
    username
}) => {
    return (
        <Card>
            <Image src={profileURL} alt='profile pic' />

            <Primary>
                {username}
            </Primary>

            <Box>
                {children}
            </Box>
        </Card>
    )
}

export default UserCard;