import React from 'react';
import styled from 'styled-components';
import { useChannelsQuery } from '../../generated/graphql';

const Container = styled.div`
    background #333;
`;

interface ChannelsProps {
    teamId: number;
}

const Channels: React.FC<ChannelsProps> = ({ teamId }) => {
    const { data } = useChannelsQuery({
        variables: { teamId }
    });

    return (
        <Container>
            Text Channels

            {data?.channels?.map(c => 
                <h1 key={c.id}>
                    {c.name}
                </h1>    
            )}
        </Container>
    )
}

export default Channels;