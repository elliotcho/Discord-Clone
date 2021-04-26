import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faLock } from '@fortawesome/free-solid-svg-icons';
import NextLink from 'next/link';

const Box = styled.div`
    margin-left: auto;
`;  

const PublicIcon = styled.div`
    color: #f2f2f2;

    ${Box}:hover & {
        color: #4d4d4d;
    }
`;

const PrivateIcon = styled.div`
    color: #f2f2f2;
`;

const ContainerStyles = `
    padding: 5px;
    position: relative;
    padding-left: 10px;
    display: flex;
    color: white;
`;

const PublicContainer = styled.div`
    ${ContainerStyles}
    cursor: pointer;

    &:hover {
        background: #808080;
    }
`;

const PrivateContainer = styled.div`
    ${ContainerStyles}
`;

const Marker = styled.div`
    background: #ccc;
    position: absolute;
    border-top-right-radius: 11px;
    border-bottom-right-radius: 11px;
    height: 20px;
    width: 5px;
    left: 0px;
`;

interface TextChannelProps {
    name: string;
    teamId: number;
    channelId: number;
    isMember: boolean;
    isRead: boolean;
    active: boolean;
}

const TextChannel: React.FC<TextChannelProps> = ({
    name,
    teamId,
    channelId,
    isMember,
    isRead,
    active
}) => {
    let style = {};

    if(active) {
        style = { background: '#808080' };
    }

    const channelRoute = `/view-team/${teamId}/${channelId}`;
    const settingsRoute = `/channel-settings/${channelId}`;

    if(!isMember) {
        return (
            <PrivateContainer>
                # {name}

                <Box>
                    <PrivateIcon>
                        <FontAwesomeIcon icon = {faLock} />
                    </PrivateIcon>
                </Box>
            </PrivateContainer>
        )
    }

    return (
        <NextLink href={channelRoute}>
            <PublicContainer style={style}>
                # {name}
                
                <NextLink href={settingsRoute}>
                    <Box>
                        <PublicIcon>
                            <FontAwesomeIcon icon = {faCog} />
                        </PublicIcon>
                    </Box>
                </NextLink>

                {!active && !isRead && (
                    <Marker />
                )}
            </PublicContainer> 
        </NextLink>
    )
}

export default TextChannel;