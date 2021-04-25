import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';
import { useChannelMembersQuery, useRemoveChannelMemberMutation } from '../../generated/graphql';
import FriendCard from '../../containers/shared/FriendCard';
import ConfirmModal from '../shared/ConfirmModal';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2`
    color: #404040;
`;

const Text = styled.div`
    padding: 15px;
    font-size: 1.3rem;
    color: #404040;
`;

const Button = styled.button`
    border: none;
    font-size: 1.2rem;
    background: #d9534f;
    cursor: pointer;
    color: #f2f2f2;
    outline: none;
    padding: 5px;

    &:hover {
        background: #ff0000;
    }
`;

interface ChannelMembersModalProps {
    isOpen: boolean;
    channelId: number;
    isPrivate: boolean;
    isOwner: boolean;
    onClose(): void;
    name: string;
}

const ChannelMembersModal : React.FC<ChannelMembersModalProps> = ({ 
    isOpen, 
    onClose, 
    isPrivate,
    channelId ,
    isOwner,
    name
}) => {
    const [userId, setUserId] = useState(-1);
    const [openKickMember, setOpenKickMember] = useState(false);
    const [removeMember] = useRemoveChannelMemberMutation();

    const { data } = useChannelMembersQuery({
        variables: { channelId },
        skip: !channelId
    });

    return(
        <Modal
            open = {isOpen}
            onClose = {onClose}
            closeOnEsc = {false}
            closeOnOverlayClick = {false}
            styles = {{
                closeButton: { outline: 'none' },
                modal: { background: '#b3b3b3' }
            }}
        >
                <Container>
                    <Header>
                        # {name} 
                    </Header>

                    {data?.channelMembers.map(u => 
                        <FriendCard
                            key = {u.id}
                            profileURL = {u.profileURL}
                            username = {u.username}
                            size = 'sm'
                        >
                            {!u.isMe && isOwner && isPrivate && (
                                <Button
                                    onClick = {() => {
                                        setOpenKickMember(true);
                                        setUserId(u.id);
                                    }}
                                >
                                    Kick
                                </Button>
                            )}
                        </FriendCard>
                    )}

                    {!data?.channelMembers.length && (
                        <Text>
                            No users available
                        </Text>
                    )}

                    <ConfirmModal
                        isOpen = {openKickMember}
                        title = 'Are you sure you want to kick this member?'
                        onClose = {() => setOpenKickMember(false)}
                        onSave = {async () => {
                            await removeMember({
                                variables: { channelId, userId },
                                update: (cache) => {
                                    cache.evict({ fieldName: 'channelInvitees '});
                                    cache.evict({ fieldName: 'channelMembers '});
                                }
                            })
                        }}
                    />
                </Container>
        </Modal>
    )
}

export default ChannelMembersModal;