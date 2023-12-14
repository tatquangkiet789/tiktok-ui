export type Login = {
    username: string;
    password: string;
};

export type Register = {
    lastName: string;
    firstName: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    avatar: File;
};

export type Auth = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    userRoleId: number;
    avatar: string;
    accessToken: string;
    tick: boolean;
};
