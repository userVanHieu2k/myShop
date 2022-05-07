import React from "react";
import { Input, Tabs, Form, Button, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import apis from "../../../api";
import { Irespone } from "../../../constants/interface";
import { SUCCESS } from "../../../constants";

const { TabPane } = Tabs;

const Profile = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const data = history.location.state.data;
  const userId = localStorage.getItem("id");
  const [dataProfile, setDataProfile] = useState("");
  const [disable, setDisable] = useState<boolean>(false);
  React.useEffect(() => {
    if (data) {
      setDataProfile(data);
      setDisable(true);
      form.setFieldsValue({
        firstname: data.firstname || "Chưa được nhập",
        lastname: data.lastname || "Chưa được nhập",
        phone: data.phone || "Chưa được nhập",
      });
    }
  }, [data]);
  function callback(key: any) {
    console.log(key);
  }

  const handleSubmit = (data: {
    firstname: string;
    lastname: string;
    phone: string;
  }) => {
    console.log(data);
    if (disable) {
      setDisable(!disable);
    } else if (!disable) {
      apis
        .updateProfile({ ...data, id: userId })
        .then(({ data }: { data: Irespone }) => {
          if (data?.status === SUCCESS) {
            notification.success({ message: "Cập nhật thành công" });
            setDisable(!disable);
          } else notification.error({ message: "Cập nhật thất bại" });
        });
    }
  };

  const handleChangePassword = (data: {
    password: string;
    new_password: string;
  }) => {
    apis
      .changePassword({ ...data, id: userId })
      .then(({ data }: { data: Irespone }) => {
        if (data?.status === SUCCESS) {
          notification.success({ message: "Đổi mật khẩu thành công" });
          setDisable(!disable);
        } else notification.error({ message: "Đổi mật khẩu thất bại" });
      });
  };

  return (
    <div className="container">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Thông tin" key="1">
          <Form
            style={{ maxWidth: "400px" }}
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Firstname"
              rules={[
                { required: true, message: "Value is not null" },
                { whitespace: true, message: "Value is not null" },
              ]}
              name="firstname"
            >
              <Input
                style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="First name"
                disabled={disable}
              />
            </Form.Item>
            <Form.Item
              label="Lastname"
              rules={[
                { required: true, message: "Value is not null" },
                { whitespace: true, message: "Value is not null" },
              ]}
              name="lastname"
            >
              <Input
                style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="Last name"
                disabled={disable}
              />
            </Form.Item>
            <Form.Item
              label="Phone number"
              rules={[
                { required: true, message: "Value is not null" },
                { whitespace: true, message: "Value is not null" },
              ]}
              name="phone"
            >
              <Input
                style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="Phone number"
                disabled={disable}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {disable ? "Thay đổi thông tin" : "Hoàn thành"}
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Đổi mật khẩu" key="2">
          <Form onFinish={handleChangePassword} style={{ maxWidth: "400px" }}>
            <Form.Item
              label="Mật khẩu cũ"
              rules={[
                { required: true, message: "Value is not null" },
                { whitespace: true, message: "Value is not null" },
              ]}
              name="password"
            >
              <Input
                type="password"
                style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              rules={[
                { required: true, message: "Value is not null" },
                { whitespace: true, message: "Value is not null" },
              ]}
              name="new_password"
            >
              <Input
                type="password"
                style={{ color: "rgba(0,0,0,.7)" }}
                placeholder="Mật khẩu mới"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Hoàn thành
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
