import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCog,
    faVolumeUp,
    faLock
 } from '@fortawesome/free-solid-svg-icons';
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
    margin-right: 15px;
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

interface VoiceChannelProps {
    name: string;
    channelId: number;
    isMember: boolean;
}

const VoiceChannel: React.FC<VoiceChannelProps> = ({
    name,
    channelId,
    isMember
}) => {
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
        <PublicContainer>
                <PrivateIcon>
                    <FontAwesomeIcon icon={faVolumeUp}/>
                </PrivateIcon> 
                
                {name}
                
                <NextLink href={settingsRoute}>
                    <Box>
                        <PublicIcon>
                            <FontAwesomeIcon icon = {faCog} />
                        </PublicIcon>
                    </Box>
                </NextLink>
        </PublicContainer> 
    )
}

export default VoiceChannel;