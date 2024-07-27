import React, {useEffect, useState} from 'react';
import {Alert, Button, Checkbox, Col, Form, Input, Row, Typography} from 'antd';
import {useUser} from "../context/UserContext";
import {useNavigate} from "react-router-dom";

const { Title } = Typography;

const LoginPage = () => {
    const [loginFailMessage, setLoginFailMessage] = useState<string | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {login} = useUser();

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('remembered_email');
        if (rememberedEmail) {
            form.setFieldsValue({email: rememberedEmail});
        }
    }, [form]);

    const onFinish = (values: any) => {
        if (values.remember) {
            localStorage.setItem('remembered_email', values.email);
        }
        login({
            email: values.email,
            password: values.password,
        })
        .then(() => {
            setLoginFailMessage(null);
            navigate('/')
        })
        .catch((error: any) => {
            console.log(error);
            setLoginFailMessage('Login failed. Please check your email and password.');
        });
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('Validation Failed:', errorInfo);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 150px)' }}>
            <Col xs={24} sm={12} md={8}>
                <div style={{padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
                    <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                    {loginFailMessage && <Alert message={loginFailMessage} type="error" showIcon/>}
                    <Form
                        form={form}
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/*TODO: Add remember me feature*/}
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Log in
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button type="link" block>
                                Forgot password?
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default LoginPage;
