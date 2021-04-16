import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Card = styled.div`
    display: flex;
    cursor: pointer;
    position: relative;
    align-items: center;
    background: #404040;
    max-width: 600px;
    padding: 15px;
    margin: 15px;

    &:hover {
        box-shadow: 0 0 0 1px #fff;
    }
`;

const Image = styled.img`
    width: 2rem;
    border-radius: 50%;
    height: 2rem;
`;

const Primary = styled.h2`
    margin-left: 20px;
    font-size: 0.8rem;
    color: #e6e6e6;
`;

const Icon = styled.div`
    position: absolute;
    left: 2.4rem;
    top: 2.4rem;
`;

interface UserCardProps {
    username: string;
    profileURL: string;
    activeStatus: number;
    handleClick?(): void;
    showStatus?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
    username,
    profileURL,
    activeStatus,
    handleClick,
    showStatus
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
        case 2: 
            color = 'green';
    }

    return (
        <Card onClick = {handleClick}>
            <Image src={profileURL} alt='profile pic'/>

            {!!showStatus && (
                <Icon style={{ color }}>
                    <FontAwesomeIcon icon={faCircle} />
                </Icon>
            )}

            <Primary>
                {username}
            </Primary>
        </Card>
    )
}

export default UserCard;