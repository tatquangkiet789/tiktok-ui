import { Content } from '../models/content';
import { User } from '../models/user';

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const IMAGES = {
    raiden: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1653748550/raiden-crying_lr8dfp.jpg',
    yae: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1658633994/yae-miko_aemkmd.jpg',
    angryYae:
        'https://res.cloudinary.com/dnwauajh9/image/upload/v1658634087/angry-yae-miko_gqxt4b.jpg',
    paimon: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1658634086/paimon_mgfzmp.jpg',
    shiba: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1639924232/default-image_gvztol.jpg',
    cheem: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1641046577/xlq16tk1iswnjeqfv4z4.jpg',
    raidenYae:
        'https://res.cloudinary.com/dnwauajh9/image/upload/v1658634282/FM6QVI6XEAIyOdK_xhwbnl.jpg',
};

export const CURRENT_USER: User = {
    id: 1,
    name: 'Raiden Shogun',
    username: 'raiden.shogun',
    avatar: IMAGES.raiden,
    tick: true,
};

export const VIDEOS = {
    test: 'https://res.cloudinary.com/dnwauajh9/video/upload/v1660552944/testing_filiqb.mp4',
};

export const URLS = {
    placeholder: 'https://www.facebook.com/quangkiet.tat.1',
};

export const CONTENT: Content[] = [
    {
        avatar: IMAGES.angryYae,
        name: 'Angry Yae',
        username: 'angry.yae',
        hashtag: 'hashtag',
        originalSound: 'Original sound',
        video: VIDEOS.test,
    },
    {
        avatar: IMAGES.raiden,
        name: 'Raiden Shogun',
        username: 'raiden.shogun',
        hashtag: 'hashtag',
        originalSound: 'Original sound',
        video: VIDEOS.test,
    },
    {
        avatar: IMAGES.yae,
        name: 'Yae Miko',
        username: 'yae.miko',
        hashtag: 'hashtag',
        originalSound: 'Original sound',
        video: VIDEOS.test,
    },
    {
        avatar: IMAGES.shiba,
        name: 'Đặng Thu Hà',
        username: 'dangthuhaf',
        hashtag: 'hashtag',
        originalSound: 'Original sound',
        video: VIDEOS.test,
    },
    {
        avatar: IMAGES.raidenYae,
        name: 'Nguyễn Thị Mỹ Loan',
        username: 'loan.ntm',
        hashtag: 'hashtag',
        originalSound: 'Original sound',
        video: VIDEOS.test,
    },
];

export const USERS = [
    {
        id: 0,
        name: 'Raiden Shogun',
        username: 'raiden.shogun',
        avatar: IMAGES.raiden,
        tick: true,
    },
    {
        id: 1,
        name: 'Yae Miko',
        username: 'yae.miko',
        avatar: IMAGES.angryYae,
        tick: true,
    },
    { id: 2, name: 'Paimon', username: 'paimon', avatar: IMAGES.paimon, tick: true },
    { id: 3, name: 'Cheem', username: 'cheem', avatar: IMAGES.cheem, tick: true },
    {
        id: 4,
        name: 'Yae Miko',
        username: 'yae.miko',
        avatar: IMAGES.angryYae,
        tick: true,
    },
    { id: 5, name: 'Paimon', username: 'paimon', avatar: IMAGES.paimon, tick: true },
    { id: 6, name: 'Cheem', username: 'cheem', avatar: IMAGES.cheem, tick: true },
    {
        id: 7,
        name: 'Yae Miko',
        username: 'yae.miko',
        avatar: IMAGES.angryYae,
        tick: true,
    },
    { id: 9, name: 'Paimon', username: 'paimon', avatar: IMAGES.paimon, tick: true },
    { id: 9, name: 'Cheem', username: 'cheem', avatar: IMAGES.cheem, tick: true },
];
