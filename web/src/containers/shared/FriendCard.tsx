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

interface FriendCardProps {
    profileURL: string;
    activeStatus?: number;
    username: string;
    size?: string;
}

const FriendCard: React.FC<FriendCardProps> = ({ 
    children, 
    profileURL, 
    activeStatus,
    username,
    size
}) => {
    let color = '';
    let dimensions = '';
    let minWidth = '400px';
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
        case 2: 
            color = 'green';
    }

    switch(size) {
        case 'sm':
            minWidth = '';
            dimensions = '2rem';
            fontSize = '0.8rem';
            margin = '0';
    }

    return (
        <Card style = {{ margin, minWidth }}>
            <Image 
                src={profileURL} 
                alt='profile pic'
                style = {{ 
                    height: dimensions,
                    width: dimensions
                }} 
            />

            {!!color && (
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

export default FriendCard;