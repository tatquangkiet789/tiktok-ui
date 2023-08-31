export interface IMessageDTO {
    userId: number;
    accessToken: string;
    content?: string;
}

export interface ICreateNewMessageDTO {
    receiverId: number;
    content: string;
    accessToken: string;
}

export interface IReceiveMessageDTO {
    content: string;
    senderDetail: {
        avatar: string;
        id: number;
    };
}
