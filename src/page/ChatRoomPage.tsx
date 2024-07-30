import React, {useEffect, useState} from 'react';
import { Avatar, Button, Col, Input, List, Row, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const MessageComponent = ({ text, sender }: { text: string, sender: string }) => {
    return (
        <Row
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '10px',
                backgroundColor: sender === 'user1' ? '#e6f7ff' : '#f0f0f0',
                borderRadius: '8px',
                marginBottom: '10px',
                flexDirection: sender === 'user1' ? 'row' : 'row-reverse',
                wordBreak: 'break-word',
            }}
        >
            <Avatar
                icon={<UserOutlined />}
                style={{
                    marginRight: sender === 'user1' ? '10px' : '0',
                    marginLeft: sender === 'user2' ? '10px' : '0',
                }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: sender === 'user1' ? 'flex-start' : 'flex-end',
                }}
            >
                <div
                    style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: sender === 'user1' ? '#e6f7ff' : '#f0f0f0',
                        textAlign: sender === 'user1' ? 'left' : 'right',
                        wordBreak: 'break-word',
                    }}
                >
                    <Typography.Text
                        style={{
                            display: 'block',
                            fontWeight: 'normal',
                        }}
                    >
                        {text}
                    </Typography.Text>
                </div>
            </div>
        </Row>
    );
};

const ChatRoomPage = () => {
    const [messages, setMessages] = useState([
        { text: 'Hi there! How’s it going?', sender: 'user1' },
        { text: 'I’m doing well, thanks! What about you?', sender: 'user2' },
    ]);
    const [input, setInput] = useState('');
    const [sender, setSender] = useState('user1'); // Toggle between 'user1' and 'user2'

    useEffect(() => {
        const socket = new WebSocket(process.env.REACT_APP_SOCKET_URL || '');
    }, []);




    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender }]);
            setInput('');
            setSender(sender === 'user1' ? 'user2' : 'user1'); // Toggle sender
        }
    };

    return (
        <div style={{ minHeight: '100vh', padding: '0 50px', marginTop: '20px' }}>
            <List
                dataSource={messages}
                renderItem={(item) => (
                    <MessageComponent text={item.text} sender={item.sender} />
                )}
                style={{ maxHeight: 300, overflowY: 'auto', marginBottom: '10px' }}
            />
            <Space direction="vertical" style={{ width: '100%' }}>
                <Row gutter={8} style={{ position: 'absolute', bottom: '20px', width: 'calc(100% - 100px)' }}>
                    <Col flex="auto">
                        <TextArea
                            rows={1}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type your message here..."
                        />
                    </Col>
                    <Col>
                        <Button type="primary" onClick={handleSendMessage}>
                            Send
                        </Button>
                    </Col>
                </Row>
            </Space>
        </div>
    );
};

export default ChatRoomPage;
