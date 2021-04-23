import React, { useEffect } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import {
    useNewMessageSubscription,
    useNewDirectMessageSubscription,
    useNewStatusUpdateSubscription,
    useNewMessageReadReceiptSubscription,
    useNewUserTypingMessageSubscription,
    useNewUserTypingDmSubscription
} from '../../generated/graphql';   

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();
    
    const { data: newDmData } = useNewDirectMessageSubscription();
    const { data: newStatusData } = useNewStatusUpdateSubscription();
    const { data: newMessageReadReceiptData } = useNewMessageReadReceiptSubscription();
    const { data: newTypingMessageData } = useNewUserTypingMessageSubscription();
    const { data: newTypingDmData } = useNewUserTypingDmSubscription();
    const { data: newMessageData } = useNewMessageSubscription();

    const subscriptionData = [
        newDmData,
        newStatusData,
        newMessageReadReceiptData,
        newTypingMessageData,
        newTypingDmData,
        newMessageData
    ];

    useEffect(() => {

        if(newStatusData) {
            const user = newStatusData?.newStatusUpdate;
            const activeStatus = user?.activeStatus;
            const userId = user?.id;

            cache.writeFragment({
                id: 'User:' + userId,
                data: { activeStatus },
                fragment: gql`
                    fragment _ on User {
                        activeStatus
                    }
                `
            });
        }

        if(newTypingMessageData) {
            cache.evict({ fieldName: 'usersTypingMessage' });
        }

        if(newTypingDmData) {
            cache.evict({ fieldName: 'userTypingDm' });
        }

        if(newMessageData) {
            cache.evict({ fieldName: 'channels' });
            cache.evict({ fieldName: 'messages' });
            cache.evict({ fieldName: 'teams' });
        }

        if(newDmData) {
            cache.evict({ fieldName: 'recentChats' });
            cache.evict({ fieldName: 'directMessages' });
            cache.evict({ fieldName: 'unreadChats' });
        }

        if(newMessageReadReceiptData) {
            cache.evict({ fieldName: 'messageReadReceipts' });
        }

    }, subscriptionData);

    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionWrapper;