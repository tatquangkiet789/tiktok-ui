import classNames from 'classnames/bind';
import { FC, Fragment } from 'react';
import { IFriendModel } from '../../models/friendDTO';
import UserItem from '../FriendItem/FriendItem';
import styles from './FriendList.module.scss';

const cx = classNames.bind(styles);

interface IFriendListProps {
    friendList: IFriendModel[];
    loading: boolean;
    error: string;
}

const FriendList: FC<IFriendListProps> = ({ friendList, loading, error }) => {
    return (
        <div className={cx('container')}>
            {friendList.length === 0 && loading ? (
                <p>Đang tải danh sách bạn bè</p>
            ) : friendList.length === 0 ? (
                <p>Không tìm thấy danh sách bạn vè</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Fragment>
                    {friendList.map(
                        ({ avatar, firstName, lastName, id, lastestMessage, tick }) => (
                            <UserItem
                                key={id}
                                avatar={avatar}
                                userId={id}
                                fullname={`${lastName} ${firstName}`}
                                lastestMessage={lastestMessage}
                                tick={tick}
                            />
                        ),
                    )}
                </Fragment>
            )}
            {/* <h1
                        ref={setElement}
                        style={{
                            width: '100%',
                            backgroundColor: 'red',
                            fontSize: '50px',
                        }}
                        >
                        End of page
                    </h1> */}
        </div>
    );
};

export default FriendList;
