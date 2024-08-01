import React, {MouseEventHandler} from 'react';
import {Avatar, Button, Col, Dropdown, Layout, Row} from 'antd';
import {Outlet, useNavigate} from 'react-router-dom';
import {useUser} from "../context/UserContext";
import {ItemType} from "antd/es/menu/interface";
import {MenuItemType} from "antd/lib/menu/interface";

const { Header, Content, Footer } = Layout;

const APP_NAME = process.env.REACT_APP_NAME || 'React App';

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const {user, logout} = useUser();
    const isLoggedIn = user !== null;

    const handleLogin: MouseEventHandler = () => {
        navigate('/login')
    }

    const items: ItemType<MenuItemType>[] = [
        {
            key: '1',
            label: 'Logout',
            onClick: () => {
                logout().then(() => {
                    navigate('/');
                });
            }
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{fontSize: '24px', cursor: 'pointer'}} onClick={() => navigate('/')}>
                    {APP_NAME}
                </div>

                <Row align="middle">
                    {isLoggedIn ? (
                        <>
                            <Col>
                                <span>{`Hello ${user?.name}`}</span>
                            </Col>
                            <Col>
                                <Dropdown menu={{items}}>
                                <Avatar src={user?.avatarUrl} style={{marginLeft: '8px', border: '2px solid #1890ff'}}/>
                                </Dropdown>
                            </Col>
                        </>
                    ) : (
                        <Button type="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    )}
                </Row>
            </Header>
            <Content>
                <main>
                    <Outlet/>
                </main>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                {APP_NAME} ©2024
            </Footer>
        </Layout>
    );
};

export default MainLayout;
