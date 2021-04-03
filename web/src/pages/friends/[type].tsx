import React from 'react';
import { withApollo } from '../../utils/withApollo';
import FriendsPage from '../friends';

const Friends: React.FC<{}> = () => {
    return (
        <FriendsPage />
    )
}

export default withApollo({ ssr: false })(Friends);