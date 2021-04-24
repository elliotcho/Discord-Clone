import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';
import { useInviteesQuery, useAddMemberMutation } from '../../generated/graphql';
import FriendCard from '../../containers/shared/FriendCard';
import InvitationModal from '../../components/shared/InvitationModal';

const Container = styled.div`
    width: 800px;
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

    const [isInviteOpen, setInviteIsOpen] = useState(false);
    let user;

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
                                    
                                    
                                    setInviteIsOpen(true);
                                    user = u.id

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

                    <InvitationModal
                        isOpen = {isInviteOpen}
                        title = 'Invite User to Channel(s)'
                        onClose = {() => setInviteIsOpen(false)}
                        teamId = {teamId}
                        userId = {user}
                        />
                </Container>
        </Modal>
    )
}

export default InvitePeopleModal;