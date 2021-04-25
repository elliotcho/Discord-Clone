import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { formatCount } from '../../utils/formatCount';
import { formatDate } from '../../utils/formatDate';

const Container = styled.div`
    margin-top: 30px;
`;

const Title = styled.div`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Wrapper = styled.div`
    display: flex;
    margin-top: 10px;
    align-items: center;
    background: #262626;
    padding: 12px;
`;

const Icon = styled.div`
    margin: 10px 0 0 20px;
    font-size: 6rem;
    color: #f2f2f2;
`;

const Box = styled.div`
    margin-right: 20px;
    margin-left: auto;
`;

const Text = styled.p`
    color: #d9d9d9;
`;

interface ChannelMetricsProps {
    numMembers: number;
    numMessages: number;
    createdAt: string;
}

const ChannelMetrics: React.FC<ChannelMetricsProps> = ({
    numMembers,
    numMessages,
    createdAt
 }) => {
    return(
        <Container>
            <Title>Channel Metrics</Title>
        
            <Wrapper>
                <Icon>
                    <FontAwesomeIcon icon={faChartBar} />
                </Icon>

                <Box>
                    <Text>
                        Members: {formatCount(numMembers)}
                    </Text>

                    <Text>
                        Created: {formatDate(createdAt)}
                    </Text>

                    <Text>
                        Messages: {formatCount(numMessages)}
                    </Text>
                </Box>
            </Wrapper>   
        </Container>
    )
}

export default ChannelMetrics;