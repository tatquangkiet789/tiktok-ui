import { io } from 'socket.io-client';

const socketClient = io('http://localhost:8080');

export default socketClient;
