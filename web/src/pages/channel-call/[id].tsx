import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faVideo,
    faMicrophone,
    faMicrophoneSlash,
    faVideoSlash,
    faPhone
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
    align-items: center;
    margin: 100px auto 150px auto;
    justify-content: center;
    flex-wrap: wrap;
`;

const Footer = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    background: #000;
    position: fixed;
    padding: 12px;
    bottom: 0px;
`;

const Flex = styled.div`
    display: flex;
    margin-left: 35%;
`;

const Icon = styled.div`
    font-size: 5rem;
`;

const WhiteIcon = styled.div`
    cursor: pointer;
    font-size: 2.5rem;

    &:hover {
       color: #ccc;
    }
`;

const RedIcon = styled.div`
    color: red;
    margin: auto 75px;
    font-size: 3.5rem;
    cursor: pointer;

    &:hover {
        color: orangered;
    }
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
                                        <WhiteIcon>
                                            <FontAwesomeIcon icon={faMicrophone}/>
                                        </WhiteIcon>
                                    )}
                                    
                                    {!micStatus && (
                                        <WhiteIcon>
                                            <FontAwesomeIcon icon={faMicrophoneSlash}/>
                                        </WhiteIcon>
                                    )}
                            </div>}

                            <RedIcon onClick={handleDisconnect}>
                                <FontAwesomeIcon icon={faPhone}/>
                            </RedIcon>

                            {streaming && <div onClick={handleMyCam}>
                                    {camStatus && (
                                        <WhiteIcon>
                                            <FontAwesomeIcon icon={faVideo}/>
                                        </WhiteIcon>
                                    )}
                                    
                                    {!camStatus && (
                                        <WhiteIcon>
                                            <FontAwesomeIcon icon={faVideoSlash}/>
                                        </WhiteIcon>
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