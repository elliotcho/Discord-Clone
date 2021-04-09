import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const Container = styled.div`
    padding: 5px;
    padding-left: 10px;
    display: flex;
    cursor: pointer;
    color: white;
    &:hover {
        background: #808080;
    }
`;

interface ChannelProps {
    active: boolean;
    route: string;
    name: string;
}

const Channel: React.FC<ChannelProps> = ({
    active,
    route,
    name
}) => {
    let style = {};
   
    if(active) {
        style = { background: '#808080' };
    }

    return (
        <NextLink href={route}>
            <Container style={style}>
                # {name}
            </Container> 
        </NextLink>
    )
}

export default Channel;