import React, {useState} from 'react';
import {Button, Col, Row, Typography} from 'antd';
import {startMatchApi} from "../api/machApi";

const {Title} = Typography;

const MatchPage: React.FC = () => {
    const [isMatching, setIsMatching] = useState<boolean>();
    const handleMatchClick = () => {
        setIsMatching(true);
        // startMatchApi().then(data => {
        //     console.log(data);
        // });

        setTimeout(() => {
            setIsMatching(false);
        }, 3000);
    };

    // FIXME: unify Row Col to Layout ?
    return (
        <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col xs={24} sm={16} md={12} lg={8} style={{textAlign: 'center'}}>
                <Title level={1}>Find Your Soul Mate</Title>
                <Button type="primary" block onClick={handleMatchClick} loading={isMatching}>
                    Match Now
                </Button>
            </Col>
        </Row>
    );
};

export default MatchPage;
