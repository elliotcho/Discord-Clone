import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useUpdateReadMutation, useDeleteChannelMutation } from '../../generated/graphql';
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

const Options = styled.div`
    margin-left: auto;
`;

interface ChannelProps {
    numChannels: number;
    channelId: number;
    active: boolean;
    isRead: boolean;
    route: string;
    name: string;
}

const Channel: React.FC<ChannelProps> = ({
    numChannels,
    channelId,
    isRead,
    active,
    route,
    name
}) => {
    let style = {};
    const [deleteChannel] = useDeleteChannelMutation();
    const [read] = useUpdateReadMutation();

    useEffect(() => {

        // const fetchData = async () => {
        //     await read({
        //         variables: { channelId },
        //         update: (cache) => {
        //             cache.evict({ fieldName: 'channels' });
        //         }
        //     });
        // }

        // if(active) {
        //     //fetchData();
        // }

    }, [channelId])

    if(active) {
        style = { background: '#808080' };
    }

    // if(!isRead) {
    //     style = { color: 'red' };
    // }

    return (
        <NextLink href={route}>
            <Container style={style}>
                # {name}
                
                {numChannels > 1 && (
                    <Options
                        onClick = {async () => {
                            await deleteChannel({
                                variables: { channelId },
                                update: (cache) => {
                                    cache.evict({ fieldName: 'channels' });
                                }
                            })
                        }}
                    >
                        X
                    </Options>
                )}
            </Container> 
        </NextLink>
    )
}

export default Channel;