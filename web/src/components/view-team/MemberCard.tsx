import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Card = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    background: #404040;
    max-width: 600px;
    padding: 15px;
    margin: 15px;
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

interface MemberCardProps {
    activeStatus: number;
    profileURL: string;
    username: string;
    online?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({
    online,
    activeStatus,
    profileURL,
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
            <Image src={profileURL} alt='profile pic'/>

            {!!online && (
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

export default MemberCard;