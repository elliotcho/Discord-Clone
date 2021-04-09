import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Card = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    border: 1px solid black;
    background: #404040;
    max-width: 600px;
    padding: 15px;
    margin: 30px;
`;

const Image = styled.img`
    width: 6rem;
    border-radius: 50%;
    height: 6rem;
`;

const Primary = styled.h2`
    margin-left: 20px;
    color: #e6e6e6;
`;

const Box = styled.div`
    margin-left: auto;
`;

const Icon = styled.div`
    position: absolute;
    font-size: 1.4rem;
    left: 5.5rem;
    top: 5.5rem;
`;

interface UserCardProps {
    profileURL: string;
    activeStatus?: number;
    username: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
    children, 
    profileURL, 
    activeStatus,
    username
}) => {
    let color = '';

    switch(activeStatus) {
        case 0: 
            color = '#bfbfbf';
            break;
        case 3: 
            color = '#cc0000';
            break;
        case 1: 
            color = '#cccc00';
            break;
        default: 
            color = 'green';
    }

    return (
        <Card>
            <Image src={profileURL} alt='profile pic' />

            {activeStatus && (
                <Icon style={{ color }}>
                    <FontAwesomeIcon icon={faCircle} />
                </Icon>
            )}

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