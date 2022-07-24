import React from 'react';
import { IoAdd, IoChatboxEllipsesOutline, IoPaperPlaneOutline } from 'react-icons/io5';
import logo from '../../assets/images/logo.svg';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { Button } from '../../../components';
import { useTranslation } from 'react-i18next';
import Search from './Search';
import Menu from './menu/Menu';
import { useAppSelector } from '../../../hooks';

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const { currentUser } = useAppSelector((state) => state.auth);

    return (
        <div
            className='w-full h-[60px] shadow-[0px_1px_1px_rgba(0,0,0,0.12)] fixed z-10
            bg-white'
        >
            <div className='max-w-[1150px] h-[60px] mx-auto flex items-center justify-between'>
                <img src={logo} alt='TikTok' />
                <Search />
                <div className='flex items-center'>
                    <Button
                        type='default'
                        text={t('upload')}
                        iconLeft={<IoAdd size={20} />}
                        to='/upload'
                    />
                    {currentUser ? (
                        <React.Fragment>
                            <Tippy content={t('messages')}>
                                <button className='ml-5 cursor-pointer'>
                                    <IoPaperPlaneOutline size={26} />
                                </button>
                            </Tippy>
                            <Tippy content={t('inbox')}>
                                <button className='ml-5 cursor-pointer'>
                                    <IoChatboxEllipsesOutline size={26} />
                                </button>
                            </Tippy>
                            <img
                                src='https://res.cloudinary.com/dnwauajh9/image/upload/v1653748550/raiden-crying_lr8dfp.jpg'
                                alt='Avatar'
                                className='ml-8 h-8 w-8 rounded-full cursor-pointer'
                            />
                        </React.Fragment>
                    ) : (
                        <div className='flex items-center justify-center ml-4'>
                            <Button type='primary' text={t('login')} />
                            <Menu />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
