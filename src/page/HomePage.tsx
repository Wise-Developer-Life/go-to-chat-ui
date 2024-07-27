import React from 'react';
import {Button, Col, Row, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import {MessageOutlined} from '@ant-design/icons';
import {useUser} from "../context/UserContext";
import MatchPage from "./MatchPage";

const {Title} = Typography;

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const {user} = useUser();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const WelcomePage: React.FC = () => {
        return (
            <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
                <Col xs={24} sm={16} md={12} lg={8} style={{textAlign: 'center'}}>
                    <Title level={1}>Welcome to GO To Chat</Title>
                    <MessageOutlined style={{fontSize: '48px', margin: '20px 0'}}/>
                    <Button type="primary" block onClick={handleRegisterClick}>
                        Register Now
                    </Button>
                </Col>
            </Row>
        )
    };

    // FIXME: unify Row Col to Layout ?
    return (
        user ? <MatchPage/> : <WelcomePage/>
    );
};

export default HomePage;
