import { suggestedUsers as data } from 'utils/data';

const useUser = () => {
    const suggestedUsers = data;
    const isLoading = true;

    return { suggestedUsers, isLoading };
};

export default useUser;
