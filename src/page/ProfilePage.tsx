import React, {useState} from 'react';
import {Button, Card, Col, Form, Input, List, Row, Typography} from 'antd';
import {useUser} from '../context/UserContext';
import {updateUserApi, uploadUserProfileImage} from '../api/userApi';
import UserProfilePicture from "../component/UserProfilePicture";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const {user} = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [form] = Form.useForm();
    const [profilePic, setProfilePic] = useState<string>(user?.avatarUrl || '');
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

    const handleEditProfilePic = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = e.target?.result;
            setProfilePic(fileData as string);
        };
        reader.readAsDataURL(file);
        setProfilePicFile(file);
    };

    const onFinish = (values: any) => {
        const promises: Promise<void>[] = []
        // console.log(profilePic, user?.avatarUrl, profilePicFile)
        if (profilePic !== user?.avatarUrl && profilePicFile) {
            const uploadImagePromise = uploadUserProfileImage(user!.id, profilePicFile)
                .catch((error) => {
                    console.error('Profile image upload failed:', error);
                });
            promises.push(uploadImagePromise);
        }


        const updateUSerPromise = updateUserApi(user!.id, {
            name: values.name,
        })
            .catch((error) => {
                console.error('Profile update failed:', error);
            });
        promises.push(updateUSerPromise);

        setIsUpdating(true);
        Promise.all(promises)
            .then(() => {
                console.log('Profile updated successfully');
                navigate(0)
            })
            .catch((error) => {
                console.error('Profile update failed:', error);
            });
    };

    const EditableProfile = () => {
        return (
            <>
                <UserProfilePicture
                    profilePic={profilePic}
                    onEdit={handleEditProfilePic}
                />
                <Form
                    form={form}
                    initialValues={{email: user?.email, name: user?.name}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {required: true, message: 'Please input your name!', whitespace: true},
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isUpdating}>
                            Save
                        </Button>
                        <Button type="default" onClick={() => setIsEditing(false)} style={{marginLeft: '10px'}}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    };


    const onClickEdit = () => {
        setIsEditing(true);
        form.setFieldsValue({name: user?.name});
        setProfilePic(user?.avatarUrl || '');
    };

    const DisplayProfile = () => {
        return (
            <>
                <UserProfilePicture profilePic={user?.avatarUrl || ''}/>
                <List
                    bordered
                    dataSource={[
                        {label: 'Email', value: user?.email},
                        {label: 'Name', value: user?.name},
                    ]}
                    renderItem={item => (
                        <List.Item>
                            <strong>{item.label}:</strong> {item.value}
                        </List.Item>
                    )}
                />
                <Button type="primary" onClick={onClickEdit} style={{marginTop: '20px'}}>
                    Edit
                </Button>
            </>

        );
    };

    return (
        <Row justify="center" style={{padding: '20px'}}>
            <Col xs={24} sm={16} md={12} lg={8}>
                <Card style={{textAlign: 'center'}}>
                    <Title level={2}>{`${user?.name}'s Profile`}</Title>
                    {isEditing ? <EditableProfile/> : <DisplayProfile/>}
                </Card>
            </Col>
        </Row>
    );
};

export default ProfilePage;
