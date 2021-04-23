import React, { useEffect } from 'react';
import styled from 'styled-components';
import { 
    useMessagesQuery, 
    useUsersTypingMessageQuery,
    useReadChannelMessagesMutation
} from '../../generated/graphql';
import TypingSnippet from '../../components/shared/TypingSnippet';
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
    const payload = {
        variables: { channelId },
        skip: !channelId
    };

    const [readChannelMessages] = useReadChannelMessagesMutation();
    const response = useUsersTypingMessageQuery(payload);
    const { data } = useMessagesQuery(payload);

    useEffect(() => {
        const onMount = async () => {
            if(channelId) {
                 await readChannelMessages({
                     variables: { channelId },
                     update: (cache) => {
                         cache.evict({ fieldName: 'channels' });
                     }
                 });
            }
        }

        onMount();
    }, [data, channelId])

    return (
        <Container>
            {response?.data?.usersTypingMessage.map(u =>
                <TypingSnippet key={u.id} {...u}/>
            )}

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