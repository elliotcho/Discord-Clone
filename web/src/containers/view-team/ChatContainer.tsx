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
    color: white;
    border: 1px solid gray;
    background: #737373;
    padding: 12px;
    width: 100%;
`;

const Header = styled.h2``;

const Body = styled.div`
    font-size: 1.4rem;
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
            {data?.messages.map(m => {
                const { username } = m.user;

                return (
                    <Card>
                        <Header>{username}</Header>

                        <Body>
                            {m.text}
                        </Body>
                    </Card>
                )
            })}
        </Container>
    )
}

export default ChatContainer;