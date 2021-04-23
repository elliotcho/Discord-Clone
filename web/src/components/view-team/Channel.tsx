import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import NextLink from 'next/link';

const Box = styled.div`
    margin-left: auto;
`;  

const Icon = styled.div`
    color: #f2f2f2;

    ${Box}:hover & {
        color: #4d4d4d;
    }
`;

const Container = styled.div`
    padding: 5px;
    position: relative;
    padding-left: 10px;
    display: flex;
    cursor: pointer;
    color: white;

    &:hover {
        background: #808080;
    }
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

interface ChannelProps {
    name: string;
    teamId: number;
    channelId: number;
    isRead: boolean;
    active: boolean;
}

const Channel: React.FC<ChannelProps> = ({
    name,
    teamId,
    channelId,
    isRead,
    active
}) => {
    let style = {};
   
    if(active) {
        style = { background: '#808080' };
    }

    const channelRoute = `/view-team/${teamId}/${channelId}`;
    const settingsRoute = `/channel-settings/${channelId}`;

    return (
        <NextLink href={channelRoute}>
            <Container style={style}>
                # {name}

               <NextLink href={settingsRoute}>
                    <Box>
                        <Icon>
                            <FontAwesomeIcon icon = {faCog} />
                        </Icon>
                    </Box>
                </NextLink>

                {!active && !isRead && (
                    <Marker />
                )}
            </Container> 
        </NextLink>
    )
}

export default Channel;