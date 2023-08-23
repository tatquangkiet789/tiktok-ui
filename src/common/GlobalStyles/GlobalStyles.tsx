import React from 'react';
import './GlobalStyles.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

interface IGlobalStylesProps {
    children: React.ReactNode;
}

const GlobalStyles: React.FC<IGlobalStylesProps> = ({ children }) => {
    return <React.Fragment>{children}</React.Fragment>;
};

export default GlobalStyles;
