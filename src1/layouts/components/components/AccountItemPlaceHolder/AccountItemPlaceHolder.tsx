import classNames from 'classnames/bind';
import { FC, Fragment, memo } from 'react';
import styles from './AccountItemPlaceHolder.module.scss';

const cx = classNames.bind(styles);

type placeHolderSize = 'md';

interface IAccountItemPlaceHolderProps {
    size?: placeHolderSize;
    instances?: number;
}

const AccountItemPlaceHolder: FC<IAccountItemPlaceHolderProps> = ({
    size,
    instances,
}) => {
    return (
        <Fragment>
            {Array(instances)
                .fill(instances)
                .map((_, index) => (
                    <div
                        key={index}
                        className={cx('container', {
                            [`${size}`]: true,
                        })}
                    >
                        <div className={cx('image')} />
                        <div className={cx('wrapper')}>
                            <p className={cx('name')}></p>
                            <p className={cx('username')}></p>
                        </div>
                    </div>
                ))}
        </Fragment>
    );
};

export default memo(AccountItemPlaceHolder);
