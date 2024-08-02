import React from 'react';
import {Button, Form, Input} from 'antd';
import {registerApi, uploadUserProfileImage} from "../api/userApi";
import {useNavigate} from "react-router-dom";
import UserProfilePicture from "../component/UserProfilePicture";

const RegistrationPage: React.FC = () => {
    const [form] = Form.useForm();
    const [profilePic, setProfilePic] = React.useState<string>('');
    const [profilePicFile, setProfilePicFile] = React.useState<File | null>(null);
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        registerApi({
            email: values.email,
            name: values.username,
            password: values.password,
        })
            .then(({data}) => {
                const userId = data['id'];
                if (!profilePicFile) {
                    return;
                }

                return uploadUserProfileImage(userId, profilePicFile)
            })
            .then(() => {
                console.log('Registration successful');
                navigate('/');
            })
            .catch((error) => {
                console.error('Registration failed:', error);
            });
    };

    const handleEditProfilePic = (fileMeta: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = e.target?.result;
            setProfilePic(fileData as string);
        };
        reader.readAsDataURL(fileMeta);
        setProfilePicFile(fileMeta);
    };

    return (
        <div style={{maxWidth: 400, margin: '0 auto', padding: '20px'}}>
            <h2>Register</h2>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            >
                <UserProfilePicture
                    profilePic={profilePic}
                    onEdit={handleEditProfilePic}
                />

                <div style={{width: '100%', textAlign: 'left'}}>
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
                </div>

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
