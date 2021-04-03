import React, { JSXElementConstructor, ReactElement } from 'react';
import { gql } from '@apollo/client';
import { 
    useSendFriendRequestMutation,
    useCancelFriendRequestMutation,
    useRemoveFriendMutation
} from '../../generated/graphql';

interface FriendButtonWrapperProps {
    children: ReactElement<any, JSXElementConstructor<any>>;
    friendStatus: number;
    friendId: number;
}

const FriendButtonWrapper: React.FC<FriendButtonWrapperProps> = ({ children, friendStatus, friendId }) => {
    const [sendFriendRequest] = useSendFriendRequestMutation();
    const [cancelFriendRequest] = useCancelFriendRequestMutation();
    const [removeFriend] = useRemoveFriendMutation();

    const handleClick = async () => {
        if(friendStatus === 0) {
            await sendFriendRequest({
                variables: { receiverId: friendId },
                update: (cache) => {
                    cache.writeFragment({
                        id: 'User:' + friendId,
                        fragment: gql`
                            fragment _ on User {
                                friendStatus
                            }
                        `,
                        data: { friendStatus: 1 }
                    });
                }
            })
        }

        else if(friendStatus === 1) {
            await cancelFriendRequest({
                variables: { receiverId: friendId },
                update: (cache) => {
                    cache.writeFragment({
                        id: 'User:' + friendId,
                        fragment: gql`
                            fragment _ on User {
                                friendStatus
                            }
                        `,
                        data: { friendStatus: 0 }
                    });
                }
            });
        }

        else {
            await removeFriend({
                variables: { friendId }, 
                update: (cache) => {
                    cache.writeFragment({
                        id: 'User:' + friendId,
                        fragment: gql`
                            fragment _ on User {
                                friendStatus
                            }
                        `,
                        data: { friendStatus: 0 }
                    });
                }
            });
        }
    };

    return (
        <>
            {React.cloneElement(children, {
                onClick: handleClick
            })}
        </>
    )
}

export default FriendButtonWrapper;