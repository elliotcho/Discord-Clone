import React from 'react';
import { useMeQuery } from '../../generated/graphql';

const ProfileContainer: React.FC<{}> = () => {
    const { data } = useMeQuery();

    let username = data?.me?.username || 'Loading...';

    return (
        <>
            {username}
        </>
    )
}

export default ProfileContainer;