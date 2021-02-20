import React from 'react';
import { withApollo } from '../utils/withApollo';

const Index : React.FC<{}> = () => {
  return (
    <>

    </>
  )
}

export default withApollo({ ssr: false })(Index);