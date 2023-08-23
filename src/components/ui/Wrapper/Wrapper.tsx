import classNames from 'classnames/bind';
import { FC } from 'react';
import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);

interface IWrapperProps {
    children: React.ReactNode;
}

const Wrapper: FC<IWrapperProps> = ({ children }) => {
    return <div className={cx('container')}>{children}</div>;
};

export default Wrapper;
