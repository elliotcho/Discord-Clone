import React from 'react';
import { ApolloCache } from '@apollo/client';
import styled from 'styled-components';
import { 
    AcceptFriendRequestMutation as AcceptMutation,
    DeclineFriendRequestMutation as DeclineMutation,
    useAcceptFriendRequestMutation, 
    useDeclineFriendRequestMutation, 
    useFriendRequestsQuery 
} from '../../generated/graphql';
import UserCard from '../shared/UserCard';

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

const FriendRequests: React.FC<{}> =() => {
    const { data } = useFriendRequestsQuery();

    const [acceptRequest] = useAcceptFriendRequestMutation();
    const [declineRequest] = useDeclineFriendRequestMutation();

    const getMutationPayload = (userId: number) => ({
        variables: { senderId: userId },
        update: (
            cache: ApolloCache<AcceptMutation | DeclineMutation>
        ) => {
            cache.evict({ fieldName: 'friendRequests' });
        }
    });

    return (
        <>
            {data?.friendRequests?.map(u =>
                <UserCard 
                    key = {u.id}
                    profileURL = {u.profileURL}
                    username = {u.username}
                >
                    <Button
                        onClick = {async () => {
                            const userId = u.id;
                            const payload = getMutationPayload(userId);

                            await declineRequest(payload);
                        }}
                    >
                        Decline
                    </Button>

                    <Button
                        onClick = {async () => {
                            const userId = u.id;
                            const payload = getMutationPayload(userId);

                            await acceptRequest(payload);
                        }}
                    >
                        Accept
                    </Button>
                </UserCard>
            )}
        </> 
    )
}

export default FriendRequests;