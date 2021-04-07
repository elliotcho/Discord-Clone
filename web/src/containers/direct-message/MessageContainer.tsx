import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDirectMessagesQuery } from '../../generated/graphql';
import Message from '../../components/shared/Message';
import directMessage from '../../pages/direct-message';

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
    const { data, refetch } = useDirectMessagesQuery({ variables: { receiverId } });
    const directMessages = data?.directMessages || [];
    


    useEffect(() => {
        
        async function checkReadStatus(){
            let directMessages = refetch
            if ( !directMessages[directMessage.length - 1]?.lastMessage.isRead ) {
                    alert("UNREAD MESSAGES");
            }
        }

        
        checkReadStatus();

    }, [directMessages]);

    return (
        <Container>
           {directMessages.map(m => {
               return (
                    <Message
                        key = {m.id}
                        messageId = {m.id}
                        date = {m.createdAt}
                        isDm = {true}
                        {...m.user}
                        {...m} 
                    />
               )
           })}
        </Container>
    )
}

export default MessageContainer;