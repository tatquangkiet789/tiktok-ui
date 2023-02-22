interface ISenderInfo {
    fullName: string;
    avatar: string;
}

export interface IReceiveNotification {
    notificationType: 'like' | 'comment';
    postId: number;
    senderInfo: ISenderInfo;
}

export interface ISendNotification {
    senderName: string;
    receiverName: string;
    notificationType: 'like' | 'comment';
    postId: number;
}
