import React, { useState } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useFriendsQuery, useRemoveFriendMutation } from '../../generated/graphql';
import ConfirmModal from '../../components/shared/ConfirmModal';
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
    const [userId, setUserId] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const [removeFriend] = useRemoveFriendMutation();
    const { data } = useFriendsQuery();

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
                                onClick = {() => {
                                    setUserId(u.id);
                                    setIsOpen(true);
                                }}
                            >
                                <Option>Remove Friend</Option>
                            </Dropdown>
                        </Icon>
                    </FriendCard>
                )
            )}

            <ConfirmModal
                isOpen = {isOpen}
                title = 'Are you sure you want to remove friend?'
                onClose = {() => setIsOpen(false)}
                onSave = {async () => {
                    await removeFriend({
                        variables: { friendId: userId },
                        update: (cache) => {
                            cache.writeFragment({
                                id: 'User:' + userId,
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
            />
        </> 
    )
}

export default Friends;