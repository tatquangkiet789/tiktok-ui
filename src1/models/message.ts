export interface IMessage {
    id: number;
    senderDetail: {
        id: number;
        avatar: string;
    };
    receiverDetail: {
        id: number;
        avatar: string;
    };
    content: string;
    createdDate: Date;
}
