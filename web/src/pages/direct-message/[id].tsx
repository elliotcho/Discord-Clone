import React from 'react';
import { withApollo } from '../../utils/withApollo';
import DirectMessagePage from '../direct-message';

const DirectMessage : React.FC<{}> = () => {
    return (
        <DirectMessagePage />
    )
}

export default withApollo({ ssr: false })(DirectMessage);