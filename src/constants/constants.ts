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

export const STORAGE_KEY = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
};

export const SOCKET_EVENT = {
    SEND_MESSAGE: 'SEND_MESSAGE',
    RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
    NEW_USER: 'NEW_USER',
    SEND_NOTIFICATION: 'SEND_NOTIFICATION',
    RECEIVE_NOTIFICATION: 'RECEIVE_NOTIFICATION',
};
