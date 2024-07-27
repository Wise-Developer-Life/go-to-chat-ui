import React from 'react';
import {Button, Form, Input} from 'antd';
import {registerApi} from "../api/userApi";
import {useNavigate} from "react-router-dom";

const RegistrationPage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        registerApi({
            email: values.email,
            name: values.username,
            password: values.password,
        })
            .then(() => {
                console.log('Registration successful');
                navigate('/')
            })
            .catch((error) => {
                console.error('Registration failed:', error);
            });
    };

    return (
        <div style={{maxWidth: 400, margin: '0 auto', padding: '20px'}}>
            <h2>Register</h2>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegistrationPage;
