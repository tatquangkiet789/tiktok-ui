import { io } from 'socket.io-client';

const socketClient = io('http://localhost:4200');

export default socketClient;
