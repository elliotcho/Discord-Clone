import React from 'react';
import styled from 'styled-components';
import { useRecentChatsQuery } from '../../generated/graphql';
import UserCard from '../../components/shared/UserCard';
import UserNav from '../../components/shared/UserNav';
import { useRouter } from 'next/router';

const Container = styled.div`
    position: relative;
    background: #1a1c20;
`;

const RecentChats : React.FC<{}> = () => {
    const { data } = useRecentChatsQuery();
    const router = useRouter();

    return (
        <Container>
            {data?.recentChats.map(u => {
                const handleClick = () => {
                    const path = `/direct-message/${u.id}`;
                    router.push(path);
                }

                return u.friendStatus == 2 && (
                    <UserCard
                        key = {u.id}
                        handleClick = {handleClick}
                        showStatus = {true}
                        {...u}
                    /> 
                );
            })}

            <UserNav />
        </Container>
    )
}

export default RecentChats;