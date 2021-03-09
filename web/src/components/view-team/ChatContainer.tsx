import React from 'react';
import styled from 'styled-components';
import { useMessagesQuery } from '../../generated/graphql';

const Container = styled.div`
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    overflow-x: hidden;
    background: #999;
    &:last-child {
        border-bottom: none;
    }
`;

const Card = styled.div`
    width: 100%;
    min-height: 140px;
    background: #737373;
    border: 1px solid gray;
`;

interface ChatContainerProps {
    channelId: number;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ channelId }) => {
    const { data } = useMessagesQuery({
        variables: { channelId }
    })

    return (
        <Container>
            {data?.messages.map(m => (
                <Card>
                    {m.text}
                </Card>
            ))}
        </Container>
    )
}

export default ChatContainer;