import AccountItem from 'components/AccountItem';
import AccountItemSkeleton from 'components/AccountItemSkeleton';
import useUser from 'hooks/useUser';

const SuggestedUsers = () => {
    const { suggestedUsers, isLoading } = useUser();

    const renderContent = () => {
        if (isLoading) return <AccountItemSkeleton instances={3} />;
        return (
            <>
                {suggestedUsers.map(
                    ({ firstName, lastName, id, isVerified, avatar, username }) => (
                        <AccountItem
                            key={id}
                            firstName={firstName}
                            lastName={lastName}
                            avatar={avatar}
                            username={username}
                            isVerified={isVerified}
                        />
                    ),
                )}
            </>
        );
    };

    return (
        <>
            <p className='text-gray075 text-sm font-semibold px-2 mt-[14px] mb-[10px]'>
                Tài khoản được đề xuất
            </p>
            {renderContent()}
        </>
    );
};

export default SuggestedUsers;
