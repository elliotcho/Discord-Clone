import React from 'react';
import styled from 'styled-components';
import { useTogglePrivacyMutation } from '../../generated/graphql';

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
    const [togglePrivacy] = useTogglePrivacyMutation();

    return (
        <>
            {isOwner && (
                <Button
                    onClick = {async () => {
                        await togglePrivacy({
                            variables: { channelId }
                        });
                    }}
                >
                    {isPrivate && 'Private'}
                    {!isPrivate && 'Public'} 
                </Button>
            )}
        </>
    )
}

export default TogglePrivacy;