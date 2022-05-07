import React, { useEffect, useState } from "react";
import api from "../../../api";
import { Button, Form, Input, Checkbox } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./styles.scss";
import { REGEX_EMAIL, REGEX_PASSWORD, SUCCESS } from "../../../constants";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [login, setLogin] = useState(true);
  const history = useHistory();
  const handleOnchange = (key: any) => (e: any) => {
    setData({ ...data, [key]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    if (!login) {
      await api.register(data).then((resp: any) => {
        console.log(resp);
        if (resp.data.status === SUCCESS) {
          localStorage.setItem("auth", resp.data.accessToken);
          localStorage.setItem("id", resp.data.id);
          localStorage.setItem("rule", resp.data.rule);
          history.push("/");
        }
      });
    } else {
      await api
        .login({ username: e.username, password: e.password })
        .then((res) => {
          if (res.data.status === SUCCESS) {
            localStorage.setItem("auth", res.data.accessToken);
            localStorage.setItem("id", res.data.userId);
            localStorage.setItem("rule", res.data.rule);
            if (res.data.rule === 2 || res.data.rule === 3) {
              history.push("/admin");
            } else history.push("/");
          }
        });
    }
  };

  const rememberChange = (e: any) => {
    setChecked(e.target.checked);
  };
  const Auth = localStorage.getItem("Auth");
  useEffect(() => {
    if (Auth) {
      history.replace("/");
    }
  }, [Auth]);
  return (
    <div className="content-page">
      <div className="container m-auto">
        <div className="content-containers col-md-12 col-lg-10">
          <div className="login">
            <h3 className="login-title">{login ? "Sign In" : "Sign Up"}</h3>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item
                name="username"
                label="Email"
                colon={false}
                className="input-username"
                rules={[
                  { required: true, message: "Enter username" },
                  {
                    pattern: new RegExp(REGEX_EMAIL),
                    message: "Phải đúng định dạng email",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter email"
                  onChange={handleOnchange("username")}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                colon={false}
                className="input-password"
                rules={[
                  { required: true, message: "Enter password" },
                  {
                    pattern: new RegExp(REGEX_PASSWORD),
                    message:
                      "Mật khẩu phải chứa chữ , ký tự đặc biệt và ít nhất 1 số",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={handleOnchange("password")}
                />
              </Form.Item>
              {!login ? (
                <>
                  {" "}
                  <Form.Item
                    name="confirm-password"
                    label="Confirm Password"
                    colon={false}
                    className="input-password"
                    rules={[
                      { required: true, message: "Enter password" },
                      { whitespace: true, message: "Enter password" },
                      ({ getFieldValue }: { getFieldValue: any }) => ({
                        validator(rule: any, value: any) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error("Password is fail"));
                        },
                      }),
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Confirm Password"
                      onChange={handleOnchange("confirm-password")}
                    />
                  </Form.Item>
                  <div className="item-flex">
                    <Form.Item
                      name="firstname"
                      label="Firstname"
                      colon={false}
                      className="input-password"
                      rules={[{ required: true, message: "Enter firstname" }]}
                    >
                      <Input
                        type="text"
                        placeholder="firstname"
                        onChange={handleOnchange("firstname")}
                      />
                    </Form.Item>
                    <Form.Item
                      name="lastname"
                      label="Lastname"
                      colon={false}
                      className="input-password"
                      rules={[{ required: true, message: "Enter lastname" }]}
                    >
                      <Input
                        type="text"
                        placeholder="Lastname"
                        onChange={handleOnchange("lastname")}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone number"
                      colon={false}
                      className="input-password"
                      rules={[
                        { required: true, message: "Enter phone number" },
                      ]}
                    >
                      <Input
                        type="text"
                        placeholder="phone number"
                        onChange={handleOnchange("phone")}
                      />
                    </Form.Item>
                  </div>
                </>
              ) : null}
              <Button
                className="login-btn-submit"
                htmlType="submit"
                type="primary"
              >
                Submit
              </Button>
            </Form>
            {login ? (
              <div className="d-flex justify-content-between mt-3 login-action">
                <Checkbox checked={checked} onChange={rememberChange}>
                  <span className="remember">Remember</span>
                </Checkbox>
                <Link to="/forgot" className="forgot-password">
                  ForgotPassword
                </Link>
              </div>
            ) : null}
          </div>
          <div className="sign-up">
            <div className="sign-up-content">
              <h3 className="sign-up-title">
                Welcome to {login ? "login" : "sign up"}
              </h3>
              <p className="mb-0">
                {login ? "Don't have an account?" : "Create new account"}
              </p>
              {login ? (
                <Button
                  onClick={() => {
                    setLogin(false);
                    form.resetFields();
                  }}
                  className="login-btn-submit border-white"
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    form.resetFields();
                    setLogin(true);
                  }}
                  className="border-white login-btn-submit"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
