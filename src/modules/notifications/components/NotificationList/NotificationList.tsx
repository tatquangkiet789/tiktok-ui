import classNames from 'classnames/bind';
import { FC } from 'react';
import NotificationItem from '../NotificationItem/NotificationItem';
import styles from './NotificationList.module.scss';
import { IReceiveNotification } from 'modules/notifications/models/notificationModel';

const cx = classNames.bind(styles);

interface INotificationListProps {
    notificationList: IReceiveNotification[];
}

const NotificationList: FC<INotificationListProps> = ({ notificationList }) => {
    return (
        <div className={cx('container')}>
            {notificationList.map((notification, index) => (
                <NotificationItem key={index} notificationItem={notification} />
            ))}
        </div>
    );
};

export default NotificationList;
