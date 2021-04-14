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

const TypingSnippet: React.FC<{}> = () => {
    return (
        <Container>
            <Span>
                Giggsy
            </Span>

            is typing...
        </Container>
    )
}

export default TypingSnippet;