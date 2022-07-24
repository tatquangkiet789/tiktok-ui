import React from 'react';
import Upload from '../pages/Upload';
import Navbar from './components/navbar/Navbar';

const HeaderOnlyLayout: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Upload />
            </div>
        </div>
    );
};

export default HeaderOnlyLayout;
