import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AuthWrapper from '../../containers/shared/AuthWrapper';
import ChannelMemberWrapper from '../../containers/shared/ChannelMemberWrapper';
import { withApollo } from '../../utils/withApollo';
import { createSocketInstance } from '../../utils/connection';
import { useRouter } from 'next/router';

const Container = styled.div`
    height: 100vh;
    background: #333;
    overflow: auto;
    color: #f2f2f2;
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

    useEffect(() => {
        const fetchConnection = async () => {
            await startConnection();
        }

        fetchConnection();
        console.log(socketInstance)

        return () => {
            socketInstance?.current?.destoryConnection();
        }
    }, []);

    const updateFromInstance = (key: string, value: any) => {
        if (key === 'displayStream') setDisplayStream(value);
        if (key === 'streaming') setStreaming(value);
    }

    const startConnection = async () => {
        socketInstance.current = await createSocketInstance({
            updateInstance: updateFromInstance
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
                    {!streaming && 
                        <div>
                            loading...
                        </div>
                    }

                    <div id="room-container"></div>

                    <footer>
                        <div>HELLO</div>
                        <div>
                            {streaming && <div onClick={handleMyMic}>
                                {micStatus ? 
                                    'mic on'
                                    :
                                    'micoff'
                                }
                            </div>}
                            <div onClick={handleDisconnect}>
                                Hang up
                            </div>
                            
                            {streaming && <div onClick={handleMyCam}>
                                {camStatus ? 
                                    'videon'
                                    :
                                    'videoff'
                                }
                            </div>}
                        </div>
                        <div>
                            <div onClick={toggleScreenShare}>
                                <h4>{displayStream ? 'Stop Screen Share' : 'Share Screen'}</h4>
                            </div>
                        </div>
                    </footer>
                </Container>
            </ChannelMemberWrapper>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(ChannelCall);