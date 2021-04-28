import openSocket from 'socket.io-client';

const WEB_SOCKET_ENDPOINT = 'ws://localhost:4001/socket.io';
const PEER_ENDPOINT = 'http://localhost:9000';

const initializePeerConnection = (Peer: any) => {
    return new Peer('', {
        host: PEER_ENDPOINT,
        secure: true
    });
}

const initializeSocketConnection = () => {
    return openSocket.connect(WEB_SOCKET_ENDPOINT, {
        rejectUnauthorized: false,
        reconnectionAttempts: 10,
        reconnection: true, 
        secure: true
    });
}

let socketInstance: any = null;
let peers: any = {};

class SocketConnection {
    videoContainer: any = {};
    settings: any;
    streaming = false;
    socket: any;
    myPeer: any;
    isSocketConnected = false;
    isPeersConnected = false;
    myID = '';

    constructor(settings:any, Peer: any) {
        this.settings = settings;
        this.myPeer = initializePeerConnection(Peer);
        this.socket = initializeSocketConnection();
        if (this.socket) this.isSocketConnected = true; 
        if (this.myPeer) this.isPeersConnected = true;
        // this.initializeSocketEvents();
        // this.initializePeersEvents();
    }

    initializeSocketEvents = () => {
        this.socket.on('connect', () => {
            console.log('socket connected');
        });

        this.socket.on('user-disconnected', (userID:string) => {
            console.log('user disconnected-- closing peers', userID);
            peers[userID] && peers[userID].close();
            this.removeVideo(userID);
        });

        this.socket.on('disconnect', () => {
            console.log('socket disconnected --');
        });
        this.socket.on('error', (err: Error) => {
            console.log('socket error --', err);
        });
    
        this.socket.on('display-media', (data: any) => {
            if (data.value) checkAndAddClass(this.getMyVideo(data.userID), 'displayMedia');
            else checkAndAddClass(this.getMyVideo(data.userID), 'userMedia');
        });
    }

    initializePeersEvents = () => {
        this.myPeer.on('open', (id) => {
            const { userDetails } = this.settings;
            this.myID = id;
            const roomID = window.location.pathname.split('/')[2];
            const userData = {
                userID: id, roomID, ...userDetails
            }
            console.log('peers established and joined room', userData);
            this.socket?.emit('join-room', userData);
            this.setNavigatorToStream();
        });

        this.myPeer.on('error', (err:Error) => {
            console.log('peer connection error', err);
            this.myPeer.reconnect();
        })
    }

    setNavigatorToStream = () => {
        this.getVideoAudioStream().then((stream:MediaStream) => {
            if (stream) {
                this.streaming = true;
                this.settings.updateInstance('streaming', true);
                this.createVideo({ id: this.myID, stream });
                this.setPeersListeners(stream);
                this.newUserConnection(stream);
            }
        })
    }

    getVideoAudioStream = (video:boolean=true, audio:boolean=true) => {
        const myNavigator =  navigator.mediaDevices.getUserMedia;
        
        return myNavigator({
            video: video ? {
                frameRate: 12,
                noiseSuppression: true,
                width: {min: 640, ideal: 1280, max: 1920},
                height: {min: 480, ideal: 720, max: 1080}
            } : false,
            audio: audio,
        });
    }

    setPeersListeners = (stream:MediaStream) => {
        this.myPeer.on('call', (call:any) => {
            call.answer(stream);
            call.on('stream', (userVideoStream:MediaStream) => {
                this.createVideo({ id: call.metadata.id, stream: userVideoStream });
            });
            call.on('close', () => {
                console.log('closing peers listeners', call.metadata.id);
                this.removeVideo(call.metadata.id);
            });
            call.on('error', () => {
                console.log('peer error ------');
                this.removeVideo(call.metadata.id);
            });
            peers[call.metadata.id] = call;
        });
    }

    newUserConnection = (stream:MediaStream) => {
        this.socket.on('new-user-connect', (userData:any) => {
            console.log('New User Connected', userData);
            this.connectToNewUser(userData, stream);
        });
    }

    connectToNewUser(userData:any, stream:MediaStream) {
        const { userID } = userData;
        const call = this.myPeer.call(userID, stream, { metadata: { id: this.myID } });
        call.on('stream', (userVideoStream:MediaStream) => {
            this.createVideo({ id: userID, stream: userVideoStream, userData });
        });
        call.on('close', () => {
            console.log('closing new user', userID);
            this.removeVideo(userID);
        });
        call.on('error', () => {
            console.log('peer error ------')
            this.removeVideo(userID);
        })
        peers[userID] = call;
    }

    createVideo = (createObj: CreateVideo) => {
        if (!this.videoContainer[createObj.id]) {
            this.videoContainer[createObj.id] = {
                ...createObj,
            };
            const roomContainer = document.getElementById('room-container');
            const videoContainer = document.createElement('div');
            const video = document.createElement('video');
            video.srcObject = this.videoContainer[createObj.id].stream;
            video.id = createObj.id;
            video.autoplay = true;
            if (this.myID === createObj.id) video.muted = true;
            videoContainer.appendChild(video)
            roomContainer.append(videoContainer);
        } else {
            // @ts-ignore
            //document.getElementById(createObj.id)?.srcObject = createObj.stream;
        }
    }

    reInitializeStream = (video?:boolean, audio?:boolean, type:string='userMedia') => {
        // @ts-ignore
        const media = type === 'userMedia' ? this.getVideoAudioStream(video, audio) : navigator?.mediaDevices?.getDisplayMedia();
        return new Promise((resolve) => {
            media.then((stream:MediaStream) => {
                // @ts-ignore
                const myVideo = this.getMyVideo();
                if (type === 'displayMedia') {
                    this.toggleVideoTrack({audio, video});
                    this.listenToEndStream(stream, {video, audio});
                    this.socket?.emit('display-media', true);
                }
                checkAndAddClass(myVideo, type);
                this.createVideo({ id: this.myID, stream });
                replaceStream(stream);
                resolve(true);
            });
        });
    }
    
    removeVideo = (id:string) => {
        delete this.videoContainer[id];
        const video = document.getElementById(id);
        if (video) video.remove();
    }

    destoryConnection = () => {
        const myMediaTracks = this.videoContainer[this.myID]?.stream.getTracks();
        myMediaTracks?.forEach((track:any) => {
            track.stop();
        })
        socketInstance?.socket.disconnect();
        this.myPeer?.destroy();
    }

    getMyVideo = (id:string=this.myID) => {
        return document.getElementById(id);
    }

    listenToEndStream = (stream:MediaStream, status:MediaStatus) => {
        const videoTrack = stream.getVideoTracks();
        if (videoTrack[0]) {
            videoTrack[0].onended = () => {
                this.socket?.emit('display-media', false);
                this.reInitializeStream(status.video, status.audio, 'userMedia');
                this.settings?.updateInstance('displayStream', false);
                this.toggleVideoTrack(status);
            }
        }
    };

    toggleVideoTrack = (status:MediaStatus) => {
        const myVideo = this.getMyVideo();
        // @ts-ignore
        if (myVideo && !status.video) myVideo.srcObject?.getVideoTracks().forEach((track:any) => {
            if (track.kind === 'video') {
                !status.video && track.stop();
            }
        });
        else if (myVideo) {
            this.reInitializeStream(status.video, status.audio);
        }
    }

    toggleAudioTrack = (status:MediaStatus) => {
        const myVideo = this.getMyVideo();
        // @ts-ignore
        if (myVideo) myVideo.srcObject?.getAudioTracks().forEach((track:any) => {
            if (track.kind === 'audio')
                track.enabled = status.audio;
                status.audio ? this.reInitializeStream(status.video, status.audio) : track.stop();
        });
    }

}

const replaceStream = (mediaStream:MediaStream) => {
    Object.values(peers).map((peer:any) => {
        peer.peerConnection?.getSenders().map((sender:any) => {
            if(sender.track.kind == "audio") {
                if(mediaStream.getAudioTracks().length > 0){
                    sender.replaceTrack(mediaStream.getAudioTracks()[0]);
                }
            }
            if(sender.track.kind == "video") {
                if(mediaStream.getVideoTracks().length > 0){
                    sender.replaceTrack(mediaStream.getVideoTracks()[0]);
                }
            }
        });
    })
}

const checkAndAddClass = (video?:any, type:string='userMedia') => {
    if (video?.classList?.length === 0 && type === 'displayMedia')  
        video?.classList?.add('display-media');
    else 
        video?.classList?.remove('display-media');
}

export const createSocketInstance = (settings={}) => {
    import('peerjs').then(({ default: Peer }) => {
        return new SocketConnection(settings, Peer);
    });
};

interface CreateVideo {
    id: string,
    stream: MediaStream,
    userData?: any,
}

interface MediaStatus {
    video: boolean,
    audio: boolean
}