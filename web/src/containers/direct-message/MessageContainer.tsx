import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: auto;
    flex-direction: column-reverse;
    background: #808080;
    overflow-x: hidden;
    overflow-y: auto;
`;

interface MessageContainerProps {
    userId: number;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ userId }) => {
    return (
        <Container>
           
        </Container>
    )
}

export default MessageContainer;