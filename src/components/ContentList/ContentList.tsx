import React, { memo } from 'react';
import { Content } from '../../models/content';
import ContentListItem from './ContentListItem/ContentListItem';

interface ContentListProps {
    contentList: Content[];
}

const ContentList: React.FC<ContentListProps> = ({ contentList }) => {
    return (
        <React.Fragment>
            {contentList.map((content, index) => (
                <ContentListItem key={index} content={content} />
            ))}
        </React.Fragment>
    );
};

export default memo(ContentList);
