import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import Layout from '../containers/shared/MainLayout';
import DmHeader from '../components/direct-message/DmHeader';
import MessageContainer from '../containers/direct-message/MessageContainer';
import SendDm from '../components/direct-message/SendDm';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 8.5fr auto;
    overflow: hidden;
`;

const DirectMessage : React.FC<{}> = () => {
    const { query: { id } } = useRouter();

    return (
        <Layout>
            <Container>
                <DmHeader username='hello'/>

                <MessageContainer />

                <SendDm />
            </Container>
        </Layout>
    )
}

export default withApollo({ ssr: false })(DirectMessage);