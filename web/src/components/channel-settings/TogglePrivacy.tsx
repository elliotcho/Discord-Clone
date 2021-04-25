import React, { useState } from 'react';
import styled from 'styled-components';
import { useTogglePrivacyMutation } from '../../generated/graphql';
import ChannelInviteeModal from './ChannelInviteeModal';

const Button = styled.button`
    font-size: 1.3rem;
`;

interface TogglePrivacyProps {
    channelId: number;
    isPrivate: boolean;
    isOwner: boolean;
}

const TogglePrivacy: React.FC<TogglePrivacyProps> = ({ 
    channelId,
    isPrivate,
    isOwner
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [togglePrivacy] = useTogglePrivacyMutation();

    return (
        <>
            {isOwner && (
                <Button
                    onClick = {async () => {
                        await togglePrivacy({
                            variables: { channelId },
                            update: (cache) => {
                                cache.evict({ id: 'Channel:' + channelId });
                            }
                        });
                    }}
                >
                    {isPrivate && 'Private'}
                    {!isPrivate && 'Public'} 
                </Button>
            )}

            {isOwner && (
                <Button
                    onClick = {() => {
                        setIsOpen(true)
                    }}
                >
                    Invite
                </Button>
            )}

            <ChannelInviteeModal
                isOpen = {isOpen}
                onClose = {() => setIsOpen(false)}
                channelId = {channelId}
            />
        </>
    )
}

export default TogglePrivacy;