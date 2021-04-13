import React from 'react';
import styled from 'styled-components';
import { useChannelQuery } from '../../generated/graphql';

const Header = styled.h2`
    display: flex;
    align-items: center;
    background: #595959;
    color: white;
    margin: 0;
`;

const Span = styled.span`
    margin-left: 20px;
`;

interface ChatHeaderProps {
    channelId: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ channelId }) => {
    const { data } = useChannelQuery({
        variables: { channelId },
        skip: !channelId
    }); 

    return (
        <Header>
            {data?.channel && (
                <Span>
                  # {data?.channel?.name}
                </Span>
            )}
        </Header>
    )
}

export default ChatHeader;