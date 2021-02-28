import React, { useState } from 'react';
import styled from 'styled-components';
import { useChannelsQuery } from '../../generated/graphql';
import CreateChannelModal from '../../components/view-team/CreateChannelModal';
import NextLink from 'next/link';

const Container = styled.div`
    background #333;
`;

const Flex = styled.div`
    display: flex;
    color: gray;
`;

const Title = styled.h3`
    padding: 2px;
    padding-left: 10px;
`;

const Box = styled.div`
    margin-left: auto;
    font-size: 1.4rem;
    margin-top: 18px;
    cursor: pointer;
    position: relative;
    right: 15px;
    &:hover {
        color: white;
    }
`;

const Channel = styled.div`
    padding: 5px;
    padding-left: 10px;
    cursor: pointer;
    color: white;
    &:hover {
        background: #808080;
    }
`;

interface ChannelsProps {
    teamId: number;
    channelId: number;
}

const Channels: React.FC<ChannelsProps> = ({ teamId, channelId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useChannelsQuery({
        variables: { teamId }
    });

    const active = { background: '#808080' };

    return (
        <Container>
            <Flex>
                <Title>Text Channels</Title>

                <Box 
                    onClick = {() => {
                        setIsOpen(true);
                    }}
                >
                    +
                </Box>
            </Flex>

            {data?.channels?.map((c, i) => {
                let style = {};
                let route = `/view-team/${teamId}/${c.id}`;

                if((i === 0 && channelId === -1) || (channelId === c.id)) {
                    style = active;
                } 

                return (
                    <NextLink key={c.id} href={route}>
                        <Channel style={style}>
                            # {c.name}
                        </Channel> 
                    </NextLink>
                )   
            })} 

            <CreateChannelModal
                isOpen = {isOpen}
                onClose = {() => setIsOpen(false)}
                teamId = {teamId}
            />
        </Container>
    )
}

export default Channels;