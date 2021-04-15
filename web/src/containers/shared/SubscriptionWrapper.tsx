import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import {
    useNewMessageSubscription,
    useNewDirectMessageSubscription,
    useNewUserTypingMessageSubscription,
    useNewUserTypingDmSubscription
} from '../../generated/graphql';   

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();
    
    const { data: newDmData } = useNewDirectMessageSubscription();
    const { data: newTypingDmData } = useNewUserTypingDmSubscription();
    const { data: newTypingMessageData } = useNewUserTypingMessageSubscription();
    const { data: newMessageData } = useNewMessageSubscription();

    const subscriptionData = [
        newDmData,
        newTypingDmData,
        newTypingMessageData,
        newMessageData
    ];

    useEffect(() => {

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
        }

    }, subscriptionData);

    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionWrapper;