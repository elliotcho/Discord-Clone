import React from 'react';
import styled from 'styled-components';
import { useMembersQuery } from '../../generated/graphql';

const Container = styled.div`
    background: #333;
`;

interface MembersProps {
    teamId: number;
}

const Members: React.FC<MembersProps> = ({ teamId }) => {
    const { data } = useMembersQuery({
        variables: { teamId }
    });

    return (
        <Container>
           
        </Container>
    )
}

export default Members;