export const createSocketConnection = (io: any) => {
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
    
}