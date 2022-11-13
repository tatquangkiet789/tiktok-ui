import React, { memo } from 'react';
import ContentList from '../components/ContentList/ContentList';
import { CONTENT } from '../constants/constants';

const Home: React.FC = () => {
    return (
        <div className='py-8 max-w-[692px] ml-auto'>
            <ContentList contentList={CONTENT} />
        </div>
    );
};

export default memo(Home);
