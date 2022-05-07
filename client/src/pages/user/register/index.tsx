import React, { useState } from 'react';
import { Form, Button,Input } from 'antd';
import api from '../../../api';
const Register = () => {
  const [value,setValue] = useState({
    username: '',
    password: '',
  })

  const handleOnchange = (key:any) => (e:any) => {
    setValue({...value,[key]: e.target.value});
  }
  const handleRegister = async(e:any) => {
    e.preventDefault();
    await api.register(value).then(resp => {
    })
  }
   return (
     <Form name="formRegister" initialValues={{ remember: true }}
     onFinish={handleRegister}>
        <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password  />
      </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
       
     </Form>
   )
}

export default Register;