import React, {useState} from 'react';
import {Avatar, Button, Col, Input, List, Row, Space, Typography} from 'antd';

const { TextArea } = Input;

interface MessageComponentProps {
    user: ChatUser;
    isSender: boolean;
    message: string;
}

const MessageComponent = ({user, isSender, message}: MessageComponentProps) => {
    return (
        <Row
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '10px',
                flexDirection: isSender ? 'row-reverse' : 'row',
                wordBreak: 'break-word',
            }}
        >
            <Avatar src={user?.avatarUrl} style={{marginLeft: '8px', border: '2px solid #1890ff'}}/>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isSender ? 'flex-end' : 'flex-start',
                }}
            >
                <div
                    style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: isSender ? '#0084ff' : '#d3d3d3',
                        textAlign: isSender ? 'left' : 'right',
                        wordBreak: 'break-word',
                    }}
                >
                    <Typography.Text
                        style={{
                            display: 'block',
                            fontWeight: 'normal',
                            color: isSender ? 'white' : 'black',
                        }}
                    >
                        {message}
                    </Typography.Text>
                </div>
            </div>
        </Row>
    );
};

export interface ChatMessage {
    text: string;
    sender: string;
    receiver: string;
}

export interface ChatUser {
    email: string;
    avatarUrl: string;
}

interface ChatRoomPageProps {
    onSendMessage: (message: string) => void;
    messages: ChatMessage[];
    sender: ChatUser;
    receiver: ChatUser
}

const ChatRoomPage = ({sender, receiver, messages, onSendMessage}: ChatRoomPageProps) => {

    const [input, setInput] = useState<string>('');


    const handleSendMessage = () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) {
            return;
        }

        onSendMessage(trimmedInput);
        setInput('');
    };

    return (
        <div style={{minHeight: '100vh', padding: '0 50px', marginTop: '20px'}}>
            <List
                locale={{emptyText: ''}}
                dataSource={messages}
                renderItem={(item, index) => (
                    <MessageComponent
                        key={index}
                        user={item.sender === sender.email ? sender : receiver}
                        isSender={item.sender === sender.email}
                        message={item.text}
                    />
                )}
                style={{overflowY: 'auto', marginBottom: '20px', maxHeight: 'calc(100vh - 100px - 20px)'}}
            />

            <Space direction="vertical" style={{width: '100%'}}>
                <Row gutter={8} style={{position: 'absolute', bottom: '20px', width: 'calc(100% - 100px)'}}>
                    <Col flex="auto">
                        <TextArea
                            rows={1}
                            value={input}
                            placeholder="Type your message here..."
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
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
