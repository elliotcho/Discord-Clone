import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

const ProfileContainer: React.FC<{}> = () => {
    const { data } = useMeQuery({
        skip: isServer()
    });

    let username = data?.me?.username || 'Loading...';

    return (
        <>
            {username}
        </>
    )
}

export default ProfileContainer;