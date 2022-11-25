import classNames from 'classnames/bind';
import React from 'react';
import PostList from '../../../../components/PostList/PostList';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: React.FC = () => {
    return (
        <div className={cx('container')}>
            <PostList />
        </div>
    );
};

export default HomePage;
