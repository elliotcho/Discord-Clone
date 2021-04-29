import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faVideo,
    faMicrophone,
    faMicrophoneSlash,
    faVideoSlash,
    faPhoneSquareAlt
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { useMeQuery } from '../../generated/graphql';
import AuthWrapper from '../../containers/shared/AuthWrapper';
import ChannelMemberWrapper from '../../containers/shared/ChannelMemberWrapper';
import { withApollo } from '../../utils/withApollo';
import { createSocketInstance } from '../../utils/connection';
import { isServer } from '../../utils/isServer';
import { useRouter } from 'next/router';

const Container = styled.div`
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    background: #333;
    color: #f2f2f2;
`;

const Room = styled.div`
    display: flex;
`;

const Footer = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    position: absolute;
    background: #000;
    padding: 12px;
    bottom: 0px;
`;

const Flex = styled.div`
    display: flex;
    margin: auto;
`;

const Icon = styled.div`
    cursor: pointer;
    margin-right: 25px;
    font-size: 5rem;
`;

const Box = styled.div`
    margin-right: 30px;
    margin-left: auto;
`;

const Header = styled.h4`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const ChannelCall: React.FC<{}> = () => {
    const router = useRouter();
    let channelId = -1;

    if(typeof router?.query?.id === 'string') {
        channelId = parseInt(router.query.id);
    }

    let socketInstance = useRef(null);

    const [micStatus, setMicStatus] = useState(true);
    const [camStatus, setCamStatus] = useState(true);
    const [displayStream, setDisplayStream] = useState(false);
    const [streaming, setStreaming] = useState(false);

    const { data } = useMeQuery({
        skip: isServer()
    });

    useEffect(() => {
        const fetchConnection = async () => {
            await startConnection();
        }

        if(data?.me?.id) {
            fetchConnection();
        }

        return () => {
            socketInstance?.current?.destoryConnection();
        }
    }, [data]);

    const updateFromInstance = (key: string, value: any) => {
        if (key === 'displayStream') setDisplayStream(value);
        if (key === 'streaming') setStreaming(value);
    }

    const startConnection = async () => {
        socketInstance.current = await createSocketInstance({
            updateInstance: updateFromInstance,
            userDetails: { name: data.me.id }
        });
    }

    const handleDisconnect = () => {
        socketInstance?.current?.destoryConnection();
        window.close();
    }

    const handleMyMic = () => {
        const { getMyVideo, reInitializeStream } = socketInstance.current;
        const myVideo = getMyVideo();
        if (myVideo) myVideo.srcObject?.getAudioTracks().forEach((track:any) => {
            if (track.kind === 'audio')
                micStatus ? track.stop() : reInitializeStream(camStatus, !micStatus);
        });

        setMicStatus(!micStatus);
    }

    const handleMyCam = () => {
        if (!displayStream) {
            const { toggleVideoTrack } = socketInstance.current;
            toggleVideoTrack({ video: !camStatus, audio: micStatus });
            setCamStatus(!camStatus);
        }
    }

    const toggleScreenShare = () => {
        const { reInitializeStream, toggleVideoTrack } = socketInstance.current;
        displayStream && toggleVideoTrack({video: false, audio: true});
        reInitializeStream(false, true, !displayStream ? 'displayMedia' : 'userMedia').then(() => {
            setDisplayStream(!displayStream);
            setCamStatus(false);
        });
    }

    return (
        <AuthWrapper requiresAuth>
            <ChannelMemberWrapper channelId={channelId}>
                <Container>
                    <Room id='room-container'/>

                    <Footer>
                        <Icon>
                            <FontAwesomeIcon icon={faDiscord}/>
                        </Icon>

                        <Flex>
                            {streaming && <div onClick={handleMyMic}>
                                    {micStatus && (
                                        <Icon>
                                            <FontAwesomeIcon icon={faMicrophone}/>
                                        </Icon>
                                    )}
                                    
                                    {!micStatus && (
                                        <Icon>
                                            <FontAwesomeIcon icon={faMicrophoneSlash}/>
                                        </Icon>
                                    )}
                            </div>}

                            <Icon onClick={handleDisconnect}>
                                <FontAwesomeIcon icon={faPhoneSquareAlt}/>
                            </Icon>

                            {streaming && <div onClick={handleMyCam}>
                                    {camStatus && (
                                        <Icon>
                                            <FontAwesomeIcon icon={faVideo}/>
                                        </Icon>
                                    )}
                                    
                                    {!camStatus && (
                                        <Icon>
                                            <FontAwesomeIcon icon={faVideoSlash}/>
                                        </Icon>
                                    )}
                            </div>}
                        </Flex>

                        <Box>
                            <Header onClick={toggleScreenShare}>
                                {!displayStream && 'Start screen share'}
                                {displayStream && 'Stop screen share'}
                            </Header>
                        </Box>
                    </Footer>
                </Container>
            </ChannelMemberWrapper>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(ChannelCall);