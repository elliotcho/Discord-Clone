import React from 'react';
import styled from 'styled-components';
import {formatDate} from '../../utils/formatDate';
import { useChannelQuery, useNumOfChannelMessagesQuery } from '../../generated/graphql';

interface ChannelMetricsProps {
    channelId: number;
}

const ChannelMetrics: React.FC<ChannelMetricsProps> = ({
    channelId
 }) => {
        const { data } = useChannelQuery({variables: {channelId} });
        const name = data?.channel.name;
        const channelCreation = data?.channel.createdAt;
        const date = formatDate(channelCreation);
        const  msgs  = useNumOfChannelMessagesQuery({variables: {channelId} });
        const numOfMessages = msgs?.data;

    return(
        <>
            <h2>Channel Metrics</h2>
            <p>Number of Members:</p>
            <p>Channel Created At: {date}</p>
            <p>Number of Messages In {name} is: {numOfMessages}</p>
        </>
    )
}

export default ChannelMetrics;

