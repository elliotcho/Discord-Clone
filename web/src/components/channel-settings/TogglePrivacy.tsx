import React from 'react';
import styled from 'styled-components';
import { useTogglePrivacyMutation } from '../../generated/graphql';

const Container = styled.div`
    margin-top: 50px;
`;

const Title = styled.div`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    background: #333;
    color: #f2f2f2;
    padding: 12px;
`;

const Box = styled.div`
    margin-left: auto;
`;

const ButtonStyles = `
    border: none;
    cursor: pointer;
    font-size: 1.0rem;
    color: #f2f2f2;
    outline: none;
`;

const PrivateButton = styled.button`
    ${ButtonStyles}
    background: #cc0000;

    &:hover {
        background: #ff0000;
    }
`;

const PublicButton = styled.button`
    ${ButtonStyles}
    background: #009933;

    &:hover {
        background: #00cc44;
    }
`;

interface TogglePrivacyProps {
    channelId: number;
    isOriginal: boolean;
    isPrivate: boolean;
    isOwner: boolean;
}

const TogglePrivacy: React.FC<TogglePrivacyProps> = ({ 
    channelId,
    isOriginal,
    isPrivate,
    isOwner
}) => {
    const [togglePrivacy] = useTogglePrivacyMutation();

    const handleClick = async () => {
        await togglePrivacy({
            variables: { channelId },
            update: (cache) => {
                cache.evict({ fieldName: 'channelMembers'});
                cache.evict({ id: 'Channel:' + channelId });
            }
        });
    }

    return (
        <Container>
            <Title>Channel Privacy</Title>

            <Flex>
                {isPrivate && 'Private'}
                {!isPrivate && 'Public'} 

                <Box>

                </Box>

                {isOwner && !isOriginal &&  (
                    <>
                         {isPrivate && (
                            <PrivateButton onClick={handleClick}>
                                Private
                            </PrivateButton>
                        )}

                        {!isPrivate && (
                            <PublicButton onClick={handleClick}>
                                Public
                            </PublicButton>
                        )}
                    </>
                )}
            </Flex>
        </Container>
    )
}

export default TogglePrivacy;