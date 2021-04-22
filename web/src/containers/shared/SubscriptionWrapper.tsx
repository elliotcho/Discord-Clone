import React, { useEffect } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import {
    useNewMessageSubscription,
    useNewDirectMessageSubscription,
    useNewStatusUpdateSubscription,
    useNewUserTypingMessageSubscription,
    useNewUserTypingDmSubscription
} from '../../generated/graphql';   

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();
    
    const { data: newDmData } = useNewDirectMessageSubscription();
    const { data: newStatusData } = useNewStatusUpdateSubscription();
    const { data: newTypingMessageData } = useNewUserTypingMessageSubscription();
    const { data: newTypingDmData } = useNewUserTypingDmSubscription();
    const { data: newMessageData } = useNewMessageSubscription();

    const subscriptionData = [
        newDmData,
        newStatusData,
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

        if(newDmData) {
            cache.evict({ fieldName: 'directMessages' });
        }

        if(newTypingDmData) {
            cache.evict({ fieldName: 'userTypingDm' });
        }

        if(newTypingMessageData) {
            cache.evict({ fieldName: 'usersTypingMessage' });
        }

        if(newMessageData) {
            cache.evict({ fieldName: 'messages' });
            cache.evict({ fieldName: 'teams' });
        }

    }, subscriptionData);

    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionWrapper;