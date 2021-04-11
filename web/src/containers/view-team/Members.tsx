import React from 'react';
import styled from 'styled-components';
import { useOnlineMembersQuery, useOfflineMembersQuery } from '../../generated/graphql';
import MemberCard from '../../components/view-team/MemberCard';

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
    const { data: onlineData } = useOnlineMembersQuery({ variables: { teamId } });
    const { data: offlineData } = useOfflineMembersQuery({ variables: { teamId }});
    const offlineMembers = offlineData?.offlineMembers || [];
    const onlineMembers = onlineData?.onlineMembers || [];

    return (
        <Container>
            <Header>
                ONLINE - {onlineMembers.length}
            </Header>

            {onlineMembers.map(u => 
                <MemberCard 
                    key={u.id} 
                    online = {true}
                    {...u} 
                />
            )}

            <Header>
                OFFLINE - {offlineMembers.length}
            </Header>

            {offlineMembers.map(u => 
                <MemberCard key={u.id} {...u} />
            )}
        </Container>
    )
}

export default Members;