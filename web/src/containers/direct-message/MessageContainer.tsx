import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column-reverse;
    background: #808080;
    overflow-x: hidden;
    overflow-y: auto;
`;

const MessageContainer: React.FC<{}> = () => {
    return (
        <Container>
            HELLo
        </Container>
    )
}

export default MessageContainer;