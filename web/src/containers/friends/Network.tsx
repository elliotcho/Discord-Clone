import React from 'react';
import styled from 'styled-components';
import { useFriendsQuery } from '../../generated/graphql';
import UserCard from '../shared/UserCard';
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
    const { data } = useFriendsQuery();

    return (
        <>
            {data?.friends?.map(u =>
                <UserCard 
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
                </UserCard>
            )}
        </> 
    )
}

export default Friends;