import React from 'react';

const Notify = (props: any) => {
    const {data , handlePreview} = props;
   
    return(
    <div style={{position: 'fixed',top: '60px', left: '75%', right: '0', zIndex: 100, border: '1px solid #e9e0e0', bottom: '0', backgroundColor: '#ffffff',overflowY: 'auto'}}>
            {Array.isArray(data) && data.map((el: any, index: number)=>(
                <div style={{padding: '15px', borderBottom: '1px solid #e9e0e0', cursor: 'pointer'}} onClick={()=>handlePreview(el._id)} key={index}>
                 <strong>{el?.infor?.name}</strong> vừa đặt mua sản phẩm
            </div>
            ))}
    </div>
    )
}

export default Notify;