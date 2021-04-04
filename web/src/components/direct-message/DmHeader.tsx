import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
    background: #808080;
    padding: 0 10px;
`;

const Header = styled.h3`
    color: #f2f2f2;
`;

const Span = styled.span`
    margin-right: 15px;
    color: #ccc;    
`;

interface DmHeaderProps {
    username: string;
}

const DmHeader: React.FC<DmHeaderProps> = ({ username }) => {
    return (
        <Container>
            <Span>
                @
            </Span>

            <Header>
                {username}
            </Header>
        </Container>
    )
}

export default DmHeader;