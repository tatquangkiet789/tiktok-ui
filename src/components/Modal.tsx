import React, { ReactChildren } from 'react';
import { IoClose } from 'react-icons/io5';
import { CgArrowUpR } from 'react-icons/cg';

interface ModalProps {
    open?: boolean;
    showModal?: (value: boolean) => void;
    children?: ReactChildren;
    text?: string;
}

const Modal: React.FC<ModalProps> = ({ open, showModal, children, text }) => {
    // const handleCloseModal = () => {
    //     showModal(false);
    // };

    return (
        <div className='min-w-[400px] min-h-[280px] pt-[40px] px-[32px]'>
            <span>
                <IoClose size={20} />
            </span>
            <p className='font-bold text-[24px] leading-[22px]'>{text}</p>
            <div className='mt-4 w-[334px]'>
                <div className='w-full h-[40px] flex'>
                    <p className='font-normal'>Quay về video trước</p>
                    <span>
                        <CgArrowUpR size={20} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Modal;
