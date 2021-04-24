import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 50px;
`;

const Title = styled.div`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    background: #262626;
    padding: 12px;
`;

const Image = styled.img`
    border-radius: 11px;
    height: 5rem;
    width: 5rem;
`;

const Box = styled.div`
    margin-left: auto;
`;

const Span = styled.span`
    margin-right: 15px;
    color: #f2f2f2;
`;

interface TeamOwnerProps {
    teamId: number;
    profileURL: string;
    username: string;
}

const TeamOwner: React.FC<TeamOwnerProps> = ({ 
    teamId,
    profileURL,
    username
}) => {
    return (
        <Container>
            <Title>Team Owner</Title>

            <Flex>
                <Image src={profileURL} alt='profile pic'/>

                <Box>
                    <Span>
                        {username}
                    </Span>
                </Box>
            </Flex>
        </Container>    
    )
}

export default TeamOwner;