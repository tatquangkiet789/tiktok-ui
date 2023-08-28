export interface ILogin {
    username: string;
    password: string;
}

export interface IRegister {
    lastName: string;
    firstName: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    avatar: File;
}

export interface IAuth {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    userRoleId: number;
    avatar: string;
    accessToken: string;
    tick: boolean;
}
