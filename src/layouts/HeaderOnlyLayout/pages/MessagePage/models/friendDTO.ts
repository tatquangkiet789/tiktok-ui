export interface IFriendDTO {
    accessToken: string;
}

export interface IFriendModel {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    tick: boolean;
    lastestMessage: string;
}
