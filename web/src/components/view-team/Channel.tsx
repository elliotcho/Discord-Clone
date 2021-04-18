import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
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

const Box = styled.div`
    margin-left: auto;
`;  

const Icon = styled.div`
    color: #404040;

    ${Box}:hover & {
        color: #f2f2f2;
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

               <NextLink href='/channel-settings'>
                <Box>
                        <Icon>
                            <FontAwesomeIcon icon = {faCog} />
                        </Icon>
                    </Box>
                </NextLink>
            </Container> 
        </NextLink>
    )
}

export default Channel;