import PostList from 'features/posts/components/PostList';
import usePost from 'features/posts/hooks/usePost';
import { Suspense, useState } from 'react';

const HomePage = () => {
    const [page, setPage] = useState(1);
    const { posts, isLastPage } = usePost({ page });

    // useEffect(() => {
    //     if (page === 1) dispatch(updateNewPostList(true));
    //     else dispatch(updateNewPostList(false));

    //     dispatch(findAllPosts({ page: page }));
    // }, [dispatch, page]);

    return (
        <div className='w-full h-full py-6 pl-0 pr-4'>
            <Suspense fallback={<div>Loading...</div>}>
                <PostList posts={posts} isLastPage page={page} onChangePage={setPage} />
            </Suspense>
        </div>
    );
};

export default HomePage;
