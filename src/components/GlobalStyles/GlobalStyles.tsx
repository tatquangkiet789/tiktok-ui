import React from 'react';
import './GlobalStyles.scss';

interface GlobalStylesProps {
    children: React.ReactNode;
}

const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
    return <React.Fragment>{children}</React.Fragment>;
};

export default GlobalStyles;
