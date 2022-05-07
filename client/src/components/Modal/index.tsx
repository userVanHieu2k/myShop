import React from 'react';
import { Modal } from 'antd'
import './style.scss';
interface Props{
    visible?: boolean;
    onSubmit?: (e: any) => void | any ;
    onCancle?: () => void | any;
    children? : any;
    data?: any;
}

const ModalAntd = (props: Props) => {
    const {visible, children, onSubmit, onCancle} = props;
    return (
        <Modal width = '40%' onOk={onSubmit} visible={visible} footer={null} onCancel={onCancle}>
           {children}
        </Modal>
    )
}

export default ModalAntd;