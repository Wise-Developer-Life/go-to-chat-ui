import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Typography} from 'antd';
import {startMatchApi} from "../api/machApi";
import useWebSocket from "react-use-websocket";
import {useUser} from "../context/UserContext";
import ChatRoomPage, {ChatMessage, ChatUser} from "./ChatRoomPage";

const {Title} = Typography;

enum MatchStatus {
    MATCHING = 'matching',
    MATCHED = 'matched',
    UNMATCHED = 'unmatched',
}

const MatchPage: React.FC = () => {
    const [matchStatus, setMatchStatus] = useState<MatchStatus>(MatchStatus.UNMATCHED);
    const [sender, setSender] = useState<ChatUser | null>(null);
    const [receiver, setReceiver] = useState<ChatUser | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);


    const {user} = useUser();
    const {sendMessage, lastMessage, readyState} = useWebSocket(process.env.REACT_APP_SOCKET_URL || '', {
        queryParams: {
            user: user?.email || '',
        }
    });

    useEffect(() => {
        if (!lastMessage) {
            return;
        }

        const { event, data } = JSON.parse(lastMessage.data);
        if (event === 'matched') {
            const matchedUserRes = data['matched_user'];
            setMatchStatus(MatchStatus.MATCHED);
            setSender(user);
            setReceiver({
                email: matchedUserRes['email'],
                avatarUrl: matchedUserRes['profile_url'],
            });
        } else if (event === 'message') {
            const messageData = data as ChatMessage;
            setMessages((prev) => [...prev, messageData]);
        }

    }, [lastMessage]);

    const handleMatchClick = () => {
        setMatchStatus(MatchStatus.MATCHING);
        startMatchApi().then(r => console.log(r));
    };

    const handleSendMessage = (message: string) => {
        const messageData = {
            text: message,
            sender: sender?.email || '',
            receiver: receiver?.email || '',
        } satisfies ChatMessage;

      sendMessage(JSON.stringify({event: 'message', data: messageData}));
    };

    if (matchStatus === MatchStatus.MATCHED && sender && receiver) {
        return <ChatRoomPage
            sender = {sender}
            receiver={receiver}
            messages={messages}
            onSendMessage={handleSendMessage}
        />;
    }

    return (
        <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col xs={24} sm={16} md={12} lg={8} style={{textAlign: 'center'}}>
                <Title level={1}>Find Your Soul Mate</Title>
                <Button type="primary" block onClick={handleMatchClick} loading={matchStatus === MatchStatus.MATCHING}>
                    Match Now
                </Button>
            </Col>
        </Row>
    );
};

export default MatchPage;
