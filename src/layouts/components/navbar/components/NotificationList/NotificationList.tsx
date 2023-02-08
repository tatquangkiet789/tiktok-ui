import classNames from 'classnames/bind';
import { IReceiveNotification } from 'models/notificationDTO';
import { FC } from 'react';
import NotificationItem from './components/NotificationItem/NotificationItem';
import styles from './NotificationList.module.scss';

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
