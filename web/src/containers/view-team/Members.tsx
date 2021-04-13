import React from 'react';
import styled from 'styled-components';
import { useOnlineMembersQuery, useOfflineMembersQuery } from '../../generated/graphql';
import UserCard from '../../components/shared/UserCard';

const Container = styled.div`
    background: #333;
`;

const Header = styled.h4`
    color: #737373;
    margin: 15px;
`;

interface MembersProps {
    teamId: number;
}

const Members: React.FC<MembersProps> = ({ teamId }) => {
    const payload = { 
        variables: { teamId },
        skip: !teamId
    };

    const { data: onlineData } = useOnlineMembersQuery(payload);
    const { data: offlineData } = useOfflineMembersQuery(payload);
    const offlineMembers = offlineData?.offlineMembers || [];
    const onlineMembers = onlineData?.onlineMembers || [];

    return (
        <Container>
            {!!onlineMembers.length && (
                <Header>
                    ONLINE - {onlineMembers.length}
                </Header>
            )}

            {onlineMembers.map(u => 
                <UserCard 
                    key={u.id} 
                    showStatus = {true}
                    {...u} 
                />
            )}

            {!!offlineMembers.length && (
                <Header>
                    OFFLINE - {offlineMembers.length}
                </Header>
            )}

            {offlineMembers.map(u => 
                <UserCard key={u.id} {...u} />
            )}
        </Container>
    )
}

export default Members;