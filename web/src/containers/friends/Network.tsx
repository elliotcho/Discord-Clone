import React from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useFriendsQuery, useRemoveFriendMutation } from '../../generated/graphql';
import FriendCard from '../shared/FriendCard';
import NextLink from 'next/link';

const ButtonStyles = `
    color: #f2f2f2;
    padding: 10px;
    margin-right: 15px;
    border-radius: 11px;
    background: #737373;
    font-size: 1.1rem;
    cursor: pointer;
    outline: none;
    border: none;

    &:hover {
        background: #999;
    }
`

const Button = styled.button`
    ${ButtonStyles}
`;

const Icon = styled.button`
    ${ButtonStyles}
`;


const Dropdown = styled.div`
    z-index: 1;
    display: none;
    min-width: 160px;
    position: absolute;
    border-radius: 11px;
    background: #000;
    color: red;
    bottom: -25px;
    right: 35px;

    ${Icon}:hover & {
        display: block;
    }
`;

const Option = styled.div`
    margin: 12px;
    padding: 10px;
    display: flex;
    &:hover {
        background: red;
        color: #f2f2f2;
    }
`;

const Friends: React.FC<{}> =() => {
    const { data } = useFriendsQuery();
    const [removeFriend] = useRemoveFriendMutation();

    return (
        <>
            {data?.friends?.map(u =>
                u.friendStatus === 2 && (
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

                        <Icon>
                            <FontAwesomeIcon icon={faEllipsisV}/>
    
                            <Dropdown
                                onClick = {async () => {
                                    await removeFriend({
                                        variables: { friendId: u.id },
                                        update: (cache) => {
                                            cache.writeFragment({
                                                id: 'User:' + u.id,
                                                data: { friendStatus: 0 },
                                                fragment: gql`
                                                    fragment _ on User {
                                                        friendStatus
                                                    }
                                                `
                                            });
                                        }
                                    })
                                }}
                            >
                                <Option>Remove Friend</Option>
                            </Dropdown>
                        </Icon>
                    </FriendCard>
                )
            )}
        </> 
    )
}

export default Friends;