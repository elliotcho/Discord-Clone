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
    size?: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
    children, 
    profileURL, 
    activeStatus,
    username,
    size
}) => {
    let color = '';
    let dimensions = '';
    let fontSize = '';
    let margin = '';

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

    switch(size) {
        case 'sm':
            dimensions = '2rem';
            fontSize = '0.8rem';
            margin = '0';
    }

    return (
        <Card style = {{ margin }}>
            <Image 
                src={profileURL} 
                alt='profile pic'
                style = {{ 
                    height: dimensions,
                    width: dimensions
                }} 
            />

            {!!activeStatus && (
                <Icon style={{ color }}>
                    <FontAwesomeIcon icon={faCircle} />
                </Icon>
            )}

            <Primary style={{ fontSize }}>
                {username}
            </Primary>

            <Box>
                {children}
            </Box>
        </Card>
    )
}

export default UserCard;