import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Select,
  Spin,
} from "antd";
import { useHistory } from "react-router";
import "./style.scss";
import apis from "../../../../../api";
import { Irespone } from "../../../../../constants/interface";
import {
  REGEX_EMAIL,
  REGEX_PHONE_NUMBER,
  SUCCESS,
} from "../../../../../constants";
import FormatMoney from "../../../../../components/format-money";
import { PayPalButton } from "react-paypal-button-v2";
import Axios from "axios";
import ModalAntd from "../../../../../components/Modal";
import ModalPayment from "./modal";

const { Option } = Select;
const Payment = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [commune, setCommune] = useState([]);
  const [visible, setVisible] = useState(false);
  const [payment, setPayment] = useState(1);
  const [orderid, setOrderid] = useState(null);
  const [price, setPrice]: any = React.useState(null);
  const [address, setAddress] = useState({
    city: "",
    district: "",
    commune: "",
  });
  const [prop, setProp]: any = useState();
  const idUser = localStorage.getItem("id");
  const history = useHistory();
  const handleKeySale = () => {};

  const handleSubmit = (e: any) => {
    setLoading(true);
    apis
      .CreateOrder({ idUser: idUser, infor: e, product: prop })
      .then(({ data }: { data: Irespone }) => {
        if (data) {
          setLoading(false);
        }
        if (data.status === SUCCESS) {
          setOrderid(data.orderId);
          apis.deleteStore(idUser).then(({ data }: { data: Irespone }) => {
            if (data.status === SUCCESS) {
              setProp([]);
              setVisible(true);
              // history.push("/follow-order-detail");
              // notification.success({ message: "Đặt hàng thành công" });
            }
          });
        }
      });
  };
  React.useEffect(() => {
    apis.getCity().then(({ data }: { data: Irespone }) => {
      if (data.status == SUCCESS) {
        setCity(data.data);
      }
    });
  }, []);
  React.useEffect(() => {
    if (history?.location?.state) {
      setProp(history?.location?.state);
      const price$ = (history?.location?.state?.sum_price + 30000) / 23000;
      const price = Math.round(price$ * 100) / 100;
      setPrice(price);
    } else history.push("/store");
  }, []);
  const handleChangeCity = (e: string) => {
    apis.getDistrict(e).then(({ data }: { data: Irespone }) => {
      if (data?.status === SUCCESS) {
        setDistrict(data.data);
      }
    });
  };
  const handleOrder = () => {
    if (payment === 3) {
      Axios.put("/api/payment", { statusOrder: 3, orderId: orderid });
    }
    setVisible(false);
    history.push("/order-form");
  };
  const handleChangePayment = (e: any) => {
    setPayment(e.target.value);
  };
  const handleChangeDistrict = (e: string) => {
    apis.getCommune(e).then(({ data }: { data: Irespone }) => {
      if (data?.status === SUCCESS) {
        setCommune(data.data);
      }
    });
  };

  return (
    <div className="container">
      <Form onFinish={handleSubmit} className="form-contact">
        <div className="d-flex row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <h3 className="form-contact_title">Thông tin liên hệ</h3>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Không được để trống" },
                {
                  pattern: new RegExp(REGEX_PHONE_NUMBER),
                  message: "Phải đúng định dạng số điện thoại",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Địa chỉ email (tùy chọn)"
              name="email"
              rules={[
                { required: true, message: "Không được để trống" },
                {
                  pattern: new RegExp(REGEX_EMAIL),
                  message: "Phải đúng định dạng email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tỉnh/Thành Phố"
              name="city"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select onChange={handleChangeCity}>
                {Array.isArray(city) &&
                  city.map((item: any) => (
                    <Option key={item.province_code} value={item.province_name}>
                      {item.province_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Huyện/Quận"
              name="district"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select onChange={handleChangeDistrict}>
                {Array.isArray(district) &&
                  district.map((item: any) => (
                    <Option key={item.district_code} value={item.district_name}>
                      {item.district_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Phường/Xã"
              name="commune"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Select>
                {Array.isArray(commune) &&
                  commune.map((item: any) => (
                    <Option key={item.ward_code} value={item.ward_name}>
                      {item.ward_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Input placeholder="vd: số nhà/ngách/ngõ , xóm/thôn" />
            </Form.Item>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 order-form">
            <h5 className="form-contact_title">Đơn hàng của bạn</h5>

            <div className="order-form_order">
              {Array.isArray(prop?.store) &&
                prop.store.map((el: any) => (
                  <div
                    key={`${el._id}`}
                    className="d-flex py-2 card-store justify-content-between"
                  >
                    <div className="d-flex card-store_infor">
                      <img width={60} height={70} src={el.image} />
                      <div className="card-store_description">
                        {el.nameproduct} - {el.color}, {el.size}
                      </div>
                      <div className="card-store_total">
                        <span>x{el.total}</span>
                      </div>
                    </div>

                    <div>
                      <FormatMoney money={el.price_sale * el.total} />
                    </div>
                  </div>
                ))}
              <div className="order-form_sumprice">
                <div>Tạm tính</div>
                <div>
                  <FormatMoney money={prop && prop.sum_price} />
                </div>
              </div>
              <div className="order-form_sumprice">
                <div>Phí ship</div>
                <div>
                  <FormatMoney money={30000} />
                </div>
              </div>
              <div className="order-form_sumprice">
                <div>Tổng cộng</div>
                <div>
                  <FormatMoney money={prop && prop.sum_price + 30000} />
                </div>
              </div>
            </div>

            {/* <div className="py-3 order-form_text">Bạn đặt hàng và thanh toán sau khi nhân viên bưu điện đưa hàng đến nơi và thu tiền tận nhà bạn</div> */}
            <Button htmlType="submit" className="order-form_submit">
              {loading && <Spin />} Đặt hàng
            </Button>
            {visible && (
              <ModalPayment
                visible={true}
                setVisible={setVisible}
                payment={payment}
                setPayment={setPayment}
                handleOrder={handleOrder}
                price={price}
                orderid={orderid}
              />
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};
export default Payment;
