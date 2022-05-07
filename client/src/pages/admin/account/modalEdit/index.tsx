import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import "./style.scss";
import ButtonCustom from "../../../../components/Button";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../../../../constants";
interface Props {
  visible?: boolean;
  setVisible: (e: boolean) => void | undefined;
  EditAccount: (e: any) => void | undefined;
  data?: any;
  edit?: boolean;
  setEdit: (e: boolean) => void;
  CreateAccount: (e: any) => void | undefined;
}
const { Option } = Select;
const ModalEditAccount = (props: Props) => {
  const {
    visible,
    setVisible,
    EditAccount,
    data,
    edit,
    setEdit,
    CreateAccount,
  } = props;
  const [form] = Form.useForm();
  const handleSubmit = (e: any) => {
    if (edit) {
      EditAccount({ ...e, id: data?._id });
    } else CreateAccount(e);
  };
  React.useEffect(() => {
    if (edit && data) {
      form.setFieldsValue(data);
    }
  }, [data, edit]);
  return (
    <Modal
      width="40%"
      footer={null}
      visible={visible}
      onCancel={() => {
        setVisible(false);
        form.resetFields();
        setEdit(false);
      }}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[
            { required: true, message: "Is  not Null" },
            {
              pattern: new RegExp(REGEX_EMAIL),
              message: "Email phải đúng định dạng",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Is  not Null" },
            {
              pattern: new RegExp(REGEX_PASSWORD),
              message: "Mật khẩu phải chứa chữ , ký tự đặc biệt và ít nhất 1 số",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Loại tài khoản"
          name="rule"
          rules={[{ required: true, message: "Is  not Null" }]}
        >
          <Select>
            <Option value={1}>Thường</Option>
            <Option value={2}>Admin</Option>
            <Option value={3}>Nhân viên</Option>
          </Select>
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

export default ModalEditAccount;
