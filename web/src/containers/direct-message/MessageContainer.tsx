import React from 'react';
import styled from 'styled-components';
import { useDirectMessagesQuery, useUserTypingDmQuery } from '../../generated/graphql';
import TypingSnippet from '../../components/shared/TypingSnippet';
import Message from '../../components/shared/Message';

const Container = styled.div`
    display: flex;
    height: auto;
    flex-direction: column-reverse;
    background: #4d4d4d;
    overflow-x: hidden;
    overflow-y: auto;
`;

interface MessageContainerProps {
    userId: number;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ userId: receiverId }) => {
    const { data } = useDirectMessagesQuery({ variables: { receiverId } });
    const response = useUserTypingDmQuery();

    const directMessages = data?.directMessages || [];
    const username = response?.data?.userTypingDm?.username;
    const userId = response?.data?.userTypingDm?.id;

    return (
        <Container>
            {userId && (
                <TypingSnippet key={userId} username={username} />
            )}

           {directMessages.map(m => {
               return (
                    <Message
                        key = {m.id}
                        messageId = {m.id}
                        date = {m.createdAt}
                        {...m.user}
                        {...m} 
                    />
               )
           })}
        </Container>
    )
}

export default MessageContainer;