import { SERVER_URL } from 'constants/constants';
import { io } from 'socket.io-client';

const socketClient = io(SERVER_URL!);

export default socketClient;
