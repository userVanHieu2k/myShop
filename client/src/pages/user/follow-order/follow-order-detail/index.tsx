import React , {useState} from 'react';
import { useHistory } from 'react-router';
import {Button} from 'antd';
import FormatMoney from '../../../../components/format-money';
import './style.scss';

const OrderDetail = () => {
    const [orderDetail,setOrderDetail]: any = useState('');
    const history: any = useHistory();
    React.useEffect(()=>{
        if(!history.location.state){
            history.replace('/order-form');
        }
        setOrderDetail(history.location.state.item)
    },[])
    return (
        <div className="container">
             <div className="row">
                 <div className="order-detail">
                    <h5>Chi tiết đơn hàng</h5>
                    <div className="d-flex order-detail_card">
                        <div className="order-detail_card-label">
                            Mã đơn hàng :
                        </div>
                        <div>
                            OD-{orderDetail._id}
                        </div>
                    </div>
                    <div className="d-flex order-detail_card">
                        <div className="order-detail_card-label">
                            Tên người nhận :
                        </div>
                        <div>
                            {orderDetail?.infor?.name}
                        </div>
                    </div>
                    <div className="d-flex order-detail_card">
                        <div className="order-detail_card-label">Số điện thoại :</div>
                        <div>{orderDetail?.infor?.phone}</div>
                    </div>
                    <div className="d-flex order-detail_card">
                        <div className="order-detail_card-label">Địa chỉ :</div>
                        <div>{orderDetail?.infor?.address} - {orderDetail?.infor?.commune} - {orderDetail?.infor?.district} - {orderDetail?.infor?.city}</div>
                    </div>
                    <div className="d-flex order-detail_card">
                        <div className="order-detail_card-label">Sản phẩm :</div>
                        <div>
                            {Array.isArray(orderDetail?.product?.store) && orderDetail?.product?.store.map((item: any, index: number)=> (
                                <div className="d-flex order-detail_product">
                                    <div className="order-detail_product-infor">{item.nameproduct} - {item.color} - size {item.size}</div>
                                    <div>x{item.total}</div>
                                    <div><FormatMoney money={item.price_sale * item.total}/></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="d-flex order-detail_card">
                        <div className="order-detail_card-label">Phí ship :</div>
                        <div><FormatMoney money={30000} /></div>
                    </div>
                    <div className="d-flex order-detail_card">
                        <div className="order-detail_card-label">Tổng cộng :</div>
                        <div><FormatMoney money={orderDetail?.product?.sum_price + 30000}/></div>
                    </div>
                    <Button className="btn-back" onClick={()=> history.push('/order-form')}><i className="far fa-arrow-alt-circle-left pr-2"></i> Quay lại</Button>
                 </div>
             </div>
        </div>
    )
}

export default OrderDetail;