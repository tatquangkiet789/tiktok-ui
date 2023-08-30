import { SERVER_URL } from 'constants/api';
import { io } from 'socket.io-client';

const socketClient = io(SERVER_URL!);

export default socketClient;
