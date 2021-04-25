import React from 'react';
import { useChannelQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';

interface ChannelMemberProps {
    channelId: number;
}

const ChannelMemberWrapper : React.FC<ChannelMemberProps> = ({ children, channelId }) => {
    const router = useRouter();

    const { data, loading } = useChannelQuery({
        variables: { channelId },
        skip: !channelId
    });

    if(!loading) {
        if(!data?.channel?.isMember) {
            router.push('/friends');
        }

        else {
            return (
                <>
                    {children}
                </>
            )
        }
    }

    return <></>
}

export default ChannelMemberWrapper;