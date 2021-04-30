import express from 'express';

//@ts-ignore
import socket from 'socket.io';
import http from 'http';

const main = async () => {
    const app = express();
    const server = http.createServer(app);

    //@ts-ignore
    const io = socket(server, { cors: { 'origin': '*' } });
    const port = 4001;
    
    io.on('connection', (socket: any) => {
        socket.on('join-room', (userData: any) => {
            const { roomID, userID } = userData;
            
            socket.join(roomID);
            
            socket.to(roomID).broadcast.emit('new-user-connect', userData);
            
            socket.on('disconnect', () => {
                socket.to(roomID).broadcast.emit('user-disconnected', userID);
            });

            socket.on('display-media', (value: any) => {
                socket.to(roomID).broadcast.emit('display-media', { userID, value });
            });

            socket.on('user-video-off', (value: any) => {
                socket.to(roomID).broadcast.emit('user-video-off', value);
            });
        });
    });   
    
    server.listen(port, () => {
        console.log(`Listening on the port ${port}`);
    }).on('error', (e: Error) => {
        console.error(e);
    });
}

main().catch(err => {
    console.log(err);
});