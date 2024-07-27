import React from 'react';
import {Button, Col, Row, Typography} from 'antd';

const {Title} = Typography;

const HomePage: React.FC = () => {
    // TODO: implement handleMatchClick
    const handleMatchClick = () => {
        console.log('Match Now')
    };

    // FIXME: unify Row Col to Layout ?
    return (
        <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col xs={24} sm={16} md={12} lg={8} style={{textAlign: 'center'}}>
                <Title level={1}>Find Your Soul Mate</Title>
                <Button type="primary" block onClick={handleMatchClick}>
                    Match Now
                </Button>
            </Col>
        </Row>
    );
};

export default HomePage;
