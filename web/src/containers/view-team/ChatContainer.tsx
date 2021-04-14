import React from 'react';
import styled from 'styled-components';
import { useMessagesQuery } from '../../generated/graphql';
// import TypingSnippet from '../../components/shared/TypingSnippet';
import Message from '../../components/shared/Message';

const Container = styled.div`
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
    overflow-x: hidden;
    background: #4d4d4d;
    &:last-child {
        border-bottom: none;
    }
`;

interface ChatContainerProps {
    channelId: number;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ channelId }) => {
    const { data } = useMessagesQuery({
        variables: { channelId },
        skip: !channelId
    });

    return (
        <Container>
            {/* <TypingSnippet /> */}

            {data?.messages.map(m => 
                <Message
                    key = {m.id}
                    messageId = {m.id}
                    date = {m.createdAt}
                    channelId = {channelId}
                    {...m.user}
                    {...m}
                />
            )}
        </Container>
    )
}

export default ChatContainer;