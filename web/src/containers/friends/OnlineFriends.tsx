import React from 'react';
import styled from 'styled-components';
import { useOnlineFriendsQuery } from '../../generated/graphql';
import FriendCard from '../shared/FriendCard';
import NextLink from 'next/link';

const Button = styled.button`
    color: #f2f2f2;
    padding: 10px;
    margin-right: 15px;
    background: #737373;
    font-size: 1.1rem;
    cursor: pointer;
    outline: none;
    border: none;

    &:hover {
        background: #999;
    }
`;

const Friends: React.FC<{}> =() => {
    const { data } = useOnlineFriendsQuery();

    return (
        <>
            {data?.onlineFriends?.map(u =>
               !!u.activeStatus && (
                    <FriendCard 
                        key = {u.id}
                        activeStatus = {u.activeStatus}
                        profileURL = {u.profileURL}
                        username = {u.username}
                    >
                        <NextLink href={`/direct-message/${u.id}`}>
                            <Button>
                                Message
                            </Button>
                        </NextLink>
                    </FriendCard>
               )
            )}
        </> 
    )
}

export default Friends;