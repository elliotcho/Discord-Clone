import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';
import { useChannelInviteesQuery, useAddChannelMemberMutation } from '../../generated/graphql';
import FriendCard from '../../containers/shared/FriendCard';

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
    color: #fff;
    padding: 5px 10px;
    background: #40bf40;
    border-radius: 50%;
    font-size: 1.1rem;
    cursor: pointer;
    outline: none;
    border: none;
    &:hover {
        background: green;
    }
`;

interface ChannelInviteeModalProps {
    isOpen: boolean;
    onClose(): void;
    channelId: number;
}

const ChannelInviteeModal : React.FC<ChannelInviteeModalProps> = ({ isOpen, onClose, channelId }) => {
    const [addMember] = useAddChannelMemberMutation();

    const { data } = useChannelInviteesQuery({
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
                        Invite People
                    </Header>

                    {data?.channelInvitees.map(u => 
                        <FriendCard
                            key = {u.id}
                            profileURL = {u.profileURL}
                            username = {u.username}
                            size = 'sm'
                        >
                            <Button
                                onClick = {async () => {
                                    await addMember({
                                        variables: { channelId, userId: u.id },
                                        update: (cache) => {
                                            cache.evict({ fieldName: 'channelInvitees '});
                                        }
                                    });
                                }}
                            >
                                +
                            </Button>
                        </FriendCard>
                    )}

                    {!data?.channelInvitees.length && (
                        <Text>
                            No users available
                        </Text>
                    )}
                </Container>
        </Modal>
    )
}

export default ChannelInviteeModal;