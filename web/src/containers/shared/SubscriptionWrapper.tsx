import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import {
    useNewMessageSubscription,
    useNewDirectMessageSubscription
} from '../../generated/graphql';   

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();
    const { data: newMessageData } = useNewMessageSubscription();
    const { data: newDirectMessageData } = useNewDirectMessageSubscription();

    const subscriptionData = [
        newMessageData,
        newDirectMessageData,
    ];

    useEffect(() => {

        if(newMessageData) {
            cache.evict({ fieldName: 'messages' });
        }

        if(newDirectMessageData) {
            cache.evict({ fieldName: 'directMessages' });
        }

    }, subscriptionData);

    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionWrapper;