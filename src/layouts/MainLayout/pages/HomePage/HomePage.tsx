import classNames from 'classnames/bind';
import PostList from 'components/PostList/PostList';
import { FC, useState } from 'react';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: FC = () => {
    const [page, setPage] = useState(1);

    return (
        <div className={cx('container')}>
            <PostList page={page} onChangePage={setPage} />
        </div>
    );
};

export default HomePage;
