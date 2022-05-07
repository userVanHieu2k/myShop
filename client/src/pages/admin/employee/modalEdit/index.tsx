import React from "react";
import { Modal, Form, Input, Button, Select, DatePicker, Radio } from "antd";
import "./style.scss";
import ButtonCustom from "../../../../components/Button";
import moment from "moment";
const dateFormat = "YYYY/MM/DD";
interface Props {
  visible?: boolean;
  setVisible: (e: boolean) => void | undefined;
  EditEmployee: (e: any) => void | undefined;
  CreateEmployee?: ((e: any) => void | undefined) | any;
  data?: any;
  setEdit: (e: boolean) => void;
  edit: boolean;
}
const { Option } = Select;
const ModalEditEmployee = (props: Props) => {
  const { visible, setVisible, EditEmployee, data, CreateEmployee, setEdit, edit } = props;
  const [form] = Form.useForm();
  const [gender, setGender] = React.useState(0);
  const [dateBirth, setDateBirth] = React.useState("");
  const [dateJoin, setDateJoin] = React.useState("");

  const handleSubmit = (e: any) => {
    if (data?._id) {
      EditEmployee({
        ...e,
        _id: data?._id,
        date_birth: dateBirth,
        date_join: dateJoin,
      });
    } else {
      CreateEmployee({ ...e, date_birth: dateBirth, date_join: dateJoin });
    }
  };
  React.useEffect(() => {
    if(data?._id && edit){
      form.setFieldsValue({
      name: data.name,
      date_birth: moment(data.date_birth , dateFormat),
      home_town: data.home_town,
      address: data.address,
      gender: data.gender,
      phone: data.phone,
      date_join: moment(data.date_join , dateFormat),
      rate: data.rate
    });
    setDateBirth(data.date_birth);
    setDateJoin(data.date_join)
    }
    
  }, [data, edit]);

  const onChangeGender = (e: any) => {
    console.log("radio checked", e.target.value);
    setGender(e.target.value);
  };

  const OnchangeDateBirth = (date: any, dateString: any) => {
    setDateBirth(dateString);
  };

  const OnchangeDateJoin = (date: any, dateString: any) => {
    setDateJoin(dateString);
  };

  return (
    <Modal
      width="40%"
      footer={null}
      visible={visible}
      onCancel={() => {
        form.resetFields();
        setVisible(false);
        setEdit(false);
      }}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Họ tên"
          name="name"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="date_birth"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <DatePicker
            format={dateFormat}
            onChange={OnchangeDateBirth}
            value={moment(dateBirth, dateFormat)}
          />
        </Form.Item>
        <Form.Item
          label="Quê quán"
          name="home_town"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Radio.Group onChange={onChangeGender} value={gender}>
            <Radio value={0}>Nam</Radio>
            <Radio value={1}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày vào làm"
          name="date_join"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <DatePicker
            format={dateFormat}
            onChange={OnchangeDateJoin}
            value={moment(dateJoin, dateFormat)}
          />
        </Form.Item>
        <Form.Item
          label="Lương cơ bản"
          name="rate"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <ButtonCustom htmlType="submit" mode="dark">
            Hoàn thành
          </ButtonCustom>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditEmployee;
