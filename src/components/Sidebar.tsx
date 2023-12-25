import useAuth from 'features/auth/hooks/useAuth';
import NavLinks from './NavLinks';
import Button from './ui/Button';
import { APP_ROUTES } from 'routes/routes';
import SuggestedUsers from 'features/users/components/SuggestedUsers';
import { Suspense } from 'react';
import AccountItemSkeleton from './AccountItemSkeleton';
import useUser from 'features/users/hooks/useUser';

const Sidebar = () => {
    const { isAuthenticated } = useAuth();
    const { suggestedUsers } = useUser();

    return (
        <div
            className='fixed max-w-[358px] w-full h-[calc(100vh-60px)] pt-5 pl-2 pb-[26px] pr-[18px] 
            overflow-hidden hover:overflow-y-auto'
        >
            <NavLinks />
            {!isAuthenticated ? (
                <div className='pt-5 pb-[25px] ml-2 mt-[5px] border-y-[0.5px] border-y-gray012'>
                    <p className='text-base pb-5 text-gray05'>
                        Đăng nhập để follow các tác giả, thích video và xem bình luận
                    </p>
                    <Button
                        text='Đăng nhập'
                        variant='outlined'
                        size='lg'
                        to={APP_ROUTES.LOGIN}
                    />
                </div>
            ) : null}
            <Suspense fallback={<AccountItemSkeleton />}>
                <SuggestedUsers suggestedUsers={suggestedUsers} />
            </Suspense>
        </div>
    );
    //             {currentUser ? (
    //                 <Link to={`/${currentUser.username}`} className={cx('user-detail-link')}>
    //                     <img
    //                         src={currentUser.avatar}
    //                         className={cx('image')}
    //                         alt='User Avatar'
    //                     />
    //                     <p>
    //                         {currentUser.lastName} {currentUser.firstName}
    //                     </p>
    //                     {currentUser.tick ? <TickIcon /> : null}
    //                 </Link>
    //             ) : null}
};

export default Sidebar;
