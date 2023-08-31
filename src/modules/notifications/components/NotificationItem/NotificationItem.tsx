import classNames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotificationItem.module.scss';
import { IReceiveNotification } from 'modules/notifications/models/notificationModel';

const cx = classNames.bind(styles);

interface INotificationItemProps {
    notificationItem: IReceiveNotification;
}

const NotificationItem: FC<INotificationItemProps> = ({ notificationItem }) => {
    const { senderInfo, notificationType, postId } = notificationItem;

    return (
        <Link to={`/posts/${postId}`} className={cx('container')}>
            <img
                className={cx('user-avatar')}
                src={senderInfo.avatar}
                alt={senderInfo.fullName}
            />
            <p className={cx('content')}>
                {senderInfo.fullName} đã{' '}
                {notificationType === 'like'
                    ? 'thích bài viết của bạn'
                    : 'thêm một bình luận vào bài viết của bạn'}
            </p>
        </Link>
    );
};

export default NotificationItem;
