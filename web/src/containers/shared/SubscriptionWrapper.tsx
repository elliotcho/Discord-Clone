import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import {
    useNewMessageSubscription,
    useNewDirectMessageSubscription,
    useNewUserTypingMessageSubscription
} from '../../generated/graphql';   

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();
    
    const { data: newMessageData } = useNewMessageSubscription();
    const { data: newDirectMessageData } = useNewDirectMessageSubscription();
    const { data: newTypingMessageData } = useNewUserTypingMessageSubscription();

    const subscriptionData = [
        newMessageData,
        newDirectMessageData,
        newTypingMessageData
    ];

    useEffect(() => {

        if(newMessageData) {
            cache.evict({ fieldName: 'messages' });
        }

        if(newDirectMessageData) {
            cache.evict({ fieldName: 'directMessages' });
        }

        if(newTypingMessageData) {
            cache.evict({ fieldName: 'usersTypingMessage' });
        }

    }, subscriptionData);

    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionWrapper;