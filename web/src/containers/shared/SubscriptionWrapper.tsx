import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import {
    useNewMessageSubscription,
} from '../../generated/graphql';   

const SubscriptionWrapper: React.FC<{}> = ({ children }) => {
    const { cache } = useApolloClient();
    const { data: newMessageData } = useNewMessageSubscription();

    const subscriptionData = [
        newMessageData,
    ];

    useEffect(() => {

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