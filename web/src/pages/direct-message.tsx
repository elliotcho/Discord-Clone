import React from 'react';
import styled from 'styled-components';
import { useUserQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import Layout from '../containers/shared/MainLayout';
import AuthWrapper from '../containers/shared/AuthWrapper';
import DmHeader from '../components/direct-message/DmHeader';
import MessageContainer from '../containers/direct-message/MessageContainer';
import SendDm from '../components/direct-message/SendDm';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 8.5fr auto;
    overflow: auto;
    height: 100%;
`;

const DirectMessage : React.FC<{}> = () => {
    const { query: { id } } = useRouter();
    let userId: number;

    if(typeof id === 'string') {
        userId = parseInt(id);
    }
   
    const { data } = useUserQuery({ variables: { userId } });
    const  username = data?.user?.username || 'Loading...';

    return (
        <AuthWrapper requiresAuth>
            <Layout>
                <Container>
                    <DmHeader username={username} />

                    <MessageContainer userId = {userId}/>

                    <SendDm userId={userId}/>
                </Container>
            </Layout>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(DirectMessage);