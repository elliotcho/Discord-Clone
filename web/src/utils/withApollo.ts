import { 
    ApolloClient, 
    InMemoryCache,
    split 
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { createWithApollo } from './createWithApollo';
import { isServer } from './isServer';
import { NextPageContext } from 'next';

const wsLink = process.browser && new WebSocketLink({
    uri: 'ws://localhost:4000/subscriptions',
    options: {
        reconnect: true
    }
});

const uploadLink = (ctx: NextPageContext) => createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    headers: {
        cookie:
            (isServer() ?
                ctx?.req?.headers?.cookie :
                undefined
            )
    }
});

const link = (ctx: NextPageContext) => split(
    ({ query }) => {
        const definition = getMainDefinition(query);

        const useSubscriptionLink = (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );

        return !useSubscriptionLink;
    },
    uploadLink(ctx),
    wsLink
);

const client = (ctx: NextPageContext) => (
    new ApolloClient({
        link: link(ctx) as any,
        cache: new InMemoryCache
    })
);

export const withApollo = createWithApollo(client);