import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { findTop10SuggestedUsers } from '../services/userThunk';

const useUser = () => {
    const { users } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(findTop10SuggestedUsers());
    }, [dispatch]);

    return { suggestedUsers: users };
};

export default useUser;
