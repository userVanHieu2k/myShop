import React , {useState} from 'react';
import apis from '../../../api';
import './style.scss';
import {Irespone} from '../../../constants/interface';
import { SUCCESS } from '../../../constants';
import FormatMoney from '../../../components/format-money';
import { useHistory } from 'react-router';
const OrderForm = () => {
    const idUser = localStorage.getItem('id');
    const history = useHistory();
    const [order,setOrder] = useState([])
    React.useEffect(()=> {
        apis.getOrder(idUser).then(({data}: {data: Irespone})=>{
         if(data.status === SUCCESS){
            setOrder(data.data.reverse())
         }
        })
    },[])
    return (
        <div className="container">
            { order.length > 0 ?
            <div className="row order-form">
            <h3>Theo dõi đơn hàng</h3>
               <table style={{width: '100%'}}>
                   <thead>
                       <tr>
                        <th>Mã đơn hàng</th>
                       <th>Người nhận</th>
                       <th>Số điện thoại</th>
                       <th>Tổng số tiền</th>
                       <th>Trạng thái</th>
                       </tr>
                   </thead>
                   <tbody>
                       {Array.isArray(order) && order.map((item: any, index: number)=> (
                           <tr key={index} onClick={()=> history.push(`/follow-order-detail?${item._id}`,{item})}>
                               <td>OD-{item._id}</td>
                               <td>
                                    {item.infor.name}</td>
                               <td>{item.infor.phone}</td>
                               <td><FormatMoney money={item?.product?.sum_price}/></td>
                               <td><span className={item.status === 0 ? "status-default" : item.status === 1 ? "status-ship" : "status-complete"}>{item.status === 0 ? 'Chờ lấy hàng' : item.status === 1 ? 'Đang giao' : 'Đã giao hàng'}</span></td>
                           </tr>
                       ))}
                   </tbody>
               </table>
            </div>
            : 'Không có đơn hàng nào đã được đặt'}
        </div>
    )
}

export default OrderForm;
