import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { findAllPosts } from '../services/postThunk';

const usePost = ({ page }: { page: number }) => {
    const { posts, isLastPage } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(findAllPosts({ page }));
    }, [dispatch, page]);

    return { posts, isLastPage };
};

export default usePost;
