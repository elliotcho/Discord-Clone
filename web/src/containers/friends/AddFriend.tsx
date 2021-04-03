import React, { useState } from 'react';
import styled from 'styled-components';
import { useSearchResultsQuery } from '../../generated/graphql';
import UserCard from '../shared/UserCard';
import FriendButtonWrapper from '../shared/FriendButtonWrapper';
import Searchbar from '../../components/friends/Searchbar';

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

const AddFriend: React.FC<{}> =() => {
    const [query, setQuery] = useState('');

    const { data } = useSearchResultsQuery({
        variables: { query },
        skip: !query
    });

    return (
        <>
            <Searchbar 
                query = {query}
                setQuery = {(q: string) => {
                    setQuery(q);
                }}
            />

            {data?.searchResults?.map(u =>
                <UserCard 
                    key = {u.id}
                    profileURL = {u.profileURL}
                    username = {u.username}
                >
                   {!u.isMe && (
                        <FriendButtonWrapper
                            friendStatus = {u.friendStatus}
                            friendId = {u.id}
                        >
                            <Button>
                                {u.friendStatus === 0 && 'Add Friend'}
                                {u.friendStatus === 1 && 'Pending'}
                                {u.friendStatus === 2 && 'Friends'}
                            </Button>
                        </FriendButtonWrapper>
                   )}
                </UserCard>
            )}
        </> 
    )
}

export default AddFriend;