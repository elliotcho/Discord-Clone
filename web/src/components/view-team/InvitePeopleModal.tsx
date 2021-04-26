import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';
import { useInviteesQuery, useAddMemberMutation } from '../../generated/graphql';
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

interface InvitePeopleModalProps {
    isOpen: boolean;
    onClose(): void;
    teamId: number;
}

const InvitePeopleModal : React.FC<InvitePeopleModalProps> = ({ isOpen, onClose, teamId }) => {
    const [addMember] = useAddMemberMutation();

    const { data } = useInviteesQuery({
        variables: { teamId },
        skip: !teamId
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

                    {data?.invitees.map(u => 
                        <FriendCard
                            key = {u.id}
                            profileURL = {u.profileURL}
                            username = {u.username}
                            size = 'sm'
                        >
                            <Button
                                onClick = {async () => {
                                    await addMember({
                                        variables: { teamId, userId: u.id },
                                        update: (cache) => {
                                            cache.evict({ fieldName: 'channelInvitees' });
                                            cache.evict({ fieldName: 'channelMembers' });
                                            cache.evict({ fieldName: 'invitees' });
                                            cache.evict({ fieldName: 'members' });
                                        }
                                    });
                                }}
                            >
                                +
                            </Button>
                        </FriendCard>
                    )}

                    {!data?.invitees.length && (
                        <Text>
                            No users available
                        </Text>
                    )}
                </Container>
        </Modal>
    )
}

export default InvitePeopleModal;