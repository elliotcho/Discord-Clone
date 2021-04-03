import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
    background: #404040;
    max-width: 600px;
    padding: 15px;
    margin: 30px;
`;

const Image = styled.img`
    width: 6rem;
    height: 6rem;
`;

const Primary = styled.h2`
    margin-left: 20px;
    color: #e6e6e6;
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