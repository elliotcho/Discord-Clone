import React from 'react';
import { withApollo } from '../utils/withApollo';
import Navbar from '../components/shared/Navbar';
import Home from '../components/shared/Home';

const Index : React.FC<{}> = () => {
  return (
    <>
      <Navbar />
      <Home /> 
    </>
  )
}

export default withApollo({ ssr: false })(Index);