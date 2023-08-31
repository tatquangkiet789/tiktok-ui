import { ENDPOINTS } from 'constants/api';
import { publicAxios } from 'lib/axiosClient';

// // [GET] /api/v1/users/suggested
export const findTop10SuggestedUsersService = async () => {
    const res = await publicAxios.get(ENDPOINTS.findTop10SuggestedUsers);
    return res.data;
};

// [GET] /api/v1/search?q=:keyword
export const findAllUsersByKeywordService = async (keyword: string) => {
    const res = await publicAxios.get(ENDPOINTS.findAllUsersByKeyword(keyword));
    return res.data;
};
