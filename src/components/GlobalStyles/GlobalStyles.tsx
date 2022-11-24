import React from 'react';
import './GlobalStyles.scss';

interface IGlobalStylesProps {
    children: React.ReactNode;
}

const GlobalStyles: React.FC<IGlobalStylesProps> = ({ children }) => {
    return <React.Fragment>{children}</React.Fragment>;
};

export default GlobalStyles;
