import React from 'react';
import { withApollo } from '../utils/withApollo';
import Navbar from '../components/shared/Navbar';

const Index : React.FC<{}> = () => {
  return (
    <>
      <Navbar />
    </>
  )
}

export default withApollo({ ssr: false })(Index);