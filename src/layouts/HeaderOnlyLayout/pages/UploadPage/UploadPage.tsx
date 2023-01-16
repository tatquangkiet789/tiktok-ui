import classNames from 'classnames/bind';
import { FC } from 'react';
import styles from './UploadPage.module.scss';

const cx = classNames.bind(styles);

const UploadPage: FC = () => {
    return <div className={cx('container')}>UploadPage</div>;
};

export default UploadPage;
