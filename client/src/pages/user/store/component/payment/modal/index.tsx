import { Modal, Radio } from "antd";
import Axios from "axios";
import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
const ModalPayment = (props: any) => {
  const {
    visible,
    setVisible,
    payment,
    setPayment,
    handleOrder,
    price,
    orderid,
  } = props;
  const handleChangePayment = (e: any) => {
    setPayment(e.target.value);
  };
  console.log(price);
  return (
    <Modal
      onOk={handleOrder}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <h5>Chọn phương thức thanh toán</h5>
      <Radio.Group onChange={handleChangePayment} value={payment}>
        <Radio value={1}>Thanh toán tiền mặt</Radio>
        <Radio value={2}>Thanh toán Paypal</Radio>
        <Radio value={3}>Chuyển khoản ngân hàng</Radio>
      </Radio.Group>
      <div>
        {payment === 1 ? (
          <div className="py-3 order-form_text">
            Bạn đặt hàng và thanh toán sau khi nhân viên bưu điện đưa hàng đến
            nơi và thu tiền tận nhà bạn
          </div>
        ) : payment === 2 ? (
          <>
            {payment === 2 && (
              <PayPalButton
                amount={price}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details: any, data: any) => {
                  console.log(data);
                  alert(
                    "Thanh toán thành công qua Paypal " +
                      details.payer.name.given_name
                  );

                  return Axios.put("/api/payment", {
                    orderId: orderid,
                    id: data.orderID,
                    statusOrder: 2,
                  }).then((resp) => {
                    console.log(resp);
                  });
                }}
              />
            )}
          </>
        ) : (
          <div className="order-banking">
            Thông tin tài khoản:
            <p>Số tài khoản: 48585858585849</p>
            <p>Chủ tài khoản: Nguyễn Văn Hiếu</p>
            <p>Ngân hàng: Techcombank</p>
            <p>
              Lưu ý: Sau khi chuyển khoản shop sẽ check thông tin chuyển khoản .
              Trạng thái thanh toán sẽ được cập nhật sau!
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalPayment;
