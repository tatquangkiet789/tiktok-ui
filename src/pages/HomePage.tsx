import { useState } from 'react';

const HomePage = () => {
    const [page, setPage] = useState(1);

    // const dispatch = useAppDispatch();
    // const {
    //     posts,
    //     error: postError,
    //     loading: postLoading,
    //     hasNextPage,
    // } = useAppSelector((state) => state.posts);

    // useEffect(() => {
    //     if (page === 1) dispatch(updateNewPostList(true));
    //     else dispatch(updateNewPostList(false));

    //     dispatch(findAllPosts({ page: page }));
    // }, [dispatch, page]);

    return (
        <div className='w-full h-full py-6 pl-0 pr-4'>
            {/* <PostList
                page={page}
                onChangePage={setPage}
                postList={posts}
                postError={postError}
                postLoading={postLoading}
                hasNextPage={hasNextPage}
            /> */}
            HomePage
        </div>
    );
};

export default HomePage;
