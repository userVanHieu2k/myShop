import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import apis from "../../../api";
import "../login/styles.scss";
import { useHistory } from "react-router-dom";
import e from "cors";
const UpdatePassword = () => {
  const history = useHistory();
  console.log(history.location);
  const code = history?.location?.search?.replace("?code=","");
  const [form] = Form.useForm();
  const [user, setUser] = useState({ password: "", confirm_password: "" });

  const handleSubmit = async (e: any) => {
    console.log(e);
    if (e.password && e.confirm_password){
       await apis.updateAccount({...e,code}).then(resp => {
    })
    }
      
  };

  return (
    <div className="content-page">
      <div className="container m-auto">
        <div className="content-containers col-md-12 col-lg-10">
          <div className="login forgots-password">
            <h3 className="login-title">Cập nhật tài khoản</h3>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item
                validateFirst
                rules={[
                  { required: true, message: "Không được để trống trường này" },
                  {
                    whitespace: true,
                    message: "Không được để trống trường này",
                  },
                ]}
                name="password"
                label="Nhập mật khẩu mới"
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                validateFirst
                rules={[
                  { required: true, message: "Không được để trống trường này" },
                  {
                    whitespace: true,
                    message: "Không được để trống trường này",
                  },
                  ({ getFieldValue }: { getFieldValue: any }) => ({
                    validator(rule: any, value: any) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu nhập chưa khớp")
                      );
                    },
                  }),
                ]}
                name="confirm_password"
                label="Nhập lại mật khẩu mới"
              >
                <Input.Password placeholder="Confirm password" />
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

export default UpdatePassword;
