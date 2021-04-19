import React, { useState } from 'react';
import styled from 'styled-components';
import { useDeleteChannelMutation } from '../../generated/graphql';
import ConfirmModal from '../../components/shared/ConfirmModal';
import { useRouter } from 'next/router';

const Container = styled.div`
    background: #262626;
    display: flex;
`;

const Box = styled.div`
    margin: 50px 30px 0 auto;
    max-width: 240px;
`;

const Ul = styled.ul`
    width: 100%;
    color: #f2f2f2;
`;

const Li = styled.li`
    cursor: pointer;
    font-size: 1.1rem;
    list-style-type: none;
    padding: 10px 20px;
    color: #f2f2f2;

    &:hover {
        background: #404040;
    }
`;

interface ChannelSidebarProps {
    isOwner: boolean;
    isOriginal: boolean;
    channelId: number;
    teamId: number;
}

const ChannelSidebar: React.FC<ChannelSidebarProps> = ({ 
    isOwner,
    isOriginal, 
    channelId,
    teamId
}) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [deleteChannel] = useDeleteChannelMutation();
    const router = useRouter();

    return (
        <Container>
            <Box>
                <Ul>
                    {!isOriginal && isOwner && (
                        <Li 
                            style={{ color: '#e60000'}}
                            onClick = {() => {
                                setOpenConfirm(true);
                            }}
                        >
                            Delete Channel
                        </Li>
                    )}
                </Ul>
            </Box>

            <ConfirmModal
                isOpen = {openConfirm}
                title = 'Are you sure you want to delete this channel?'
                onClose = {() => setOpenConfirm(false)}
                onSave = {async () => {
                    await deleteChannel({
                        variables: { channelId },
                        update: (cache) => {
                            cache.evict({ fieldName: 'channels' });
                        }
                    });

                    router.push(`/view-team/${teamId}`);
                }}
            />
        </Container>
    )
}

export default ChannelSidebar;