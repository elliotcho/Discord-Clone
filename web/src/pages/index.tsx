import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import Layout from '../containers/shared/AuthLayout';

const Index : React.FC<{}> = () => {
  return (
     <Layout>

     </Layout>
  )
}

export default withApollo({ ssr: false })(Index);