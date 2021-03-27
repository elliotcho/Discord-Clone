import React from 'react';
import { withApollo } from '../../../utils/withApollo';
import ViewTeam from '../[team]';

const ViewTeams: React.FC<{}> = () => {
    return (
        <ViewTeam />
    )
}

export default withApollo({ ssr: false })(ViewTeams);