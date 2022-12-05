export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    userRoleId: number;
    dateOfBirth: Date;
    email: string;
    createdDate: Date;
    deletedDate?: Date;
    tick: boolean;
}
