import React from 'react';
import styled from 'styled-components';

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

const ChatHeader: React.FC<{}> = () => {
    return (
        <Header>
            <Span>
                # general
            </Span>
        </Header>
    )
}

export default ChatHeader;