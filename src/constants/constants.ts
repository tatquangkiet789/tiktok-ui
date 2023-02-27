export const BASE_URL = process.env.REACT_APP_API_URL;

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ROLES = {
    ADMIN: 1,
    USER: 2,
};

export const POST_TYPE = {
    IMAGE: 1,
    VIDEO: 2,
    TEXT: 3,
};

export const MAX_INPUT_LENGTH = 150;

export const LOCAL_STORAGE_KEY = {
    ACCESS_TOKEN: 'accessToken',
};

export const SOCKET_EVENT = {
    NEW_USER: 'newUser',
    SEND_MESSAGE: 'sendMessage',
    RECEIVE_MESSAGE: 'receiveMessage',
    SEND_NOTIFICATION: 'sendNotification',
    RECEIVE_NOTIFICATION: 'receiveNotification',
};
