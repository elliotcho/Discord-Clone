import React from 'react';
import styled from 'styled-components';
import { useRecentChatsQuery } from '../../generated/graphql';
import UserCard from '../../components/shared/UserCard';
import UserNav from '../../components/shared/UserNav';
import NextLink from 'next/link';

const Container = styled.div`
    position: relative;
    background: #1a1c20;
`;

const RecentChats : React.FC<{}> = () => {
    const { data } = useRecentChatsQuery();

    return (
        <Container>
            {data?.recentChats.map(u => 
                 <UserCard
                 key = {u.id}
                 online = {true}
                 {...u}
             />    
            )}

            <UserNav />
        </Container>
    )
}

export default RecentChats;