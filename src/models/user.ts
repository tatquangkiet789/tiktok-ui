// export interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     full_name: string;
//     nickname: string;
//     avatar: string;
//     bio: string;
//     tick: boolean;
//     followingsCount: number;
//     followersCount: number;
//     websiteUrl: string;
//     facebookUrl: string;
//     youtubeUrl: string;
//     twitterUrl: string;
//     instagramUrl: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

export interface User {
    id: number;
    name: string;
    username: string;
    avatar: string;
    tick?: boolean;
}
