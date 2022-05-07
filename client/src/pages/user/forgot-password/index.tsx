import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import apis from "../../../api";
import "../login/styles.scss";
import { useHistory } from "react-router-dom";
import { REGEX_EMAIL } from "../../../constants";
const ForgotPassword = () => {
  const history = useHistory();
  const [user, setUser] = useState({ username: "" });
  const handleOnchange = (e: any) => {
    setUser({ username: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    await apis.forgotPassword(user).then((resp) => {});
  };

  return (
    <div className="content-page">
      <div className="container m-auto">
        <div className="content-containers col-md-12 col-lg-10">
          <div className="login forgots-password">
            <h3 className="login-title">Quên mật khẩu</h3>
            <Form onFinish={handleSubmit}>
              <Form.Item
                rules={[
                  {
                    pattern: new RegExp(REGEX_EMAIL),
                    message: "Phải đúng định dạng email",
                  },
                ]}
                label="Nhập địa chỉ email"
              >
                <Input onChange={handleOnchange} placeholder="Enter email" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-btn-submit border-white"
              >
                Hoàn thành
              </Button>
              <Button
                type="link"
                style={{ float: "right", marginTop: "15px" }}
                onClick={() => history.push("/login")}
              >
                Đăng nhập
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
