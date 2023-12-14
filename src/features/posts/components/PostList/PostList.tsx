// import classNames from 'classnames/bind';
// import { FC, Fragment, useEffect, useRef, useState } from 'react';
// import styles from './PostList.module.scss';
// import { IPost } from 'modules/posts/models/postModel';
// import PostItem from '../PostItem/PostItem';

// const cx = classNames.bind(styles);

// interface IPostListProps {
//     page: number;
//     onChangePage: (page: any) => void;
//     postList: IPost[];
//     postError: string;
//     postLoading: boolean;
//     hasNextPage: boolean;
// }

// const PostList: FC<IPostListProps> = ({
//     onChangePage,
//     postList,
//     postError,
//     postLoading,
//     hasNextPage,
// }) => {
//     const [element, setElement] = useState<HTMLDivElement | null>(null);

//     const observer = useRef(
//         new IntersectionObserver((entries) => {
//             const first = entries[0];
//             if (first.isIntersecting) onChangePage((prev: any) => prev + 1);
//         }),
//     );

//     useEffect(() => {
//         const currentElement = element;
//         const currentObserver = observer.current;

//         if (!currentElement) return;

//         currentObserver.observe(currentElement);

//         if (!hasNextPage) currentObserver.unobserve(currentElement);

//         return () => currentObserver.unobserve(currentElement);
//     }, [element, hasNextPage]);

//     return (
//         <div className={cx('container')}>
//             {postList.length === 0 && postLoading ? (
//                 <div>Đang tải bài viết</div>
//             ) : postError ? (
//                 <div>{postError}</div>
//             ) : postList.length === 0 ? (
//                 <div>Chưa có bài viết</div>
//             ) : (
//                 <Fragment>
//                     {postList.map((post) => (
//                         <PostItem key={post.id} post={post} />
//                     ))}
//                     <h1
//                         ref={setElement}
//                         style={{
//                             width: '100%',
//                             backgroundColor: 'red',
//                             fontSize: '50px',
//                         }}
//                     >
//                         End of page
//                     </h1>
//                 </Fragment>
//             )}
//         </div>
//     );
// };

// export default PostList;
export default function PostList() {
    return <h1>PostList</h1>;
}
