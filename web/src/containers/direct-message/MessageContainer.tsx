import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
     useDirectMessagesQuery, 
     useUserTypingDmQuery,
     useReadDmsMutation
} from '../../generated/graphql';
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
    const [readDms] = useReadDmsMutation();

    const { data } = useDirectMessagesQuery({ variables: { receiverId } });
    const directMessages = data?.directMessages || [];

    const response = useUserTypingDmQuery();
    const username = response?.data?.userTypingDm?.username;
    const userId = response?.data?.userTypingDm?.id;

    useEffect(() => {
        const onMount = async () => {
            await readDms({
                variables: { userId: receiverId },
                update: (cache) => {
                    cache.evict({ fieldName: 'unreadChats' });
                }
            })
        }

        onMount();
    }, [data])

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