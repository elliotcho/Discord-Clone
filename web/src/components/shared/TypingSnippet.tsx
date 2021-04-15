import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 12px;
    background: #404040;
    color: #f2f2f2;
`;

const Span = styled.span`
    margin-right: 5px;
    font-weight: bold;
`;

interface TypingSnippetProps {
    username: string;
}

const TypingSnippet: React.FC<TypingSnippetProps> = ({ username }) => {
    return (
        <Container>
            <Span>
                {username}
            </Span>

            is typing...
        </Container>
    )
}

export default TypingSnippet;