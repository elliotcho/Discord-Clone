import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';
import { useInviteesQuery, useAddMemberMutation } from '../../generated/graphql';
import UserCard from '../../containers/shared/UserCard';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2`
    color: black;
`;

interface InvitePeopleModalProps {
    isOpen: boolean;
    onClose(): void;
    teamId: number;
}

const InvitePeopleModal : React.FC<InvitePeopleModalProps> = ({ isOpen, onClose, teamId }) => {
    const [addMember] = useAddMemberMutation();

    const { data } = useInviteesQuery({
        variables: { teamId }
    });

    return(
        <Modal
            open = {isOpen}
            closeOnEsc = {false}
            closeOnOverlayClick = {false}
            styles = {{closeButton: {outline: 'none'}}}
            onClose = {onClose}
        >
                <Container>
                    <Header>
                        Invite People
                    </Header>

                    {data?.invitees.map(u => 
                        <UserCard
                            key = {u.id}
                            profileURL = {u.profileURL}
                            username = {u.username}
                        >
                            
                        </UserCard>
                    )}
                </Container>
        </Modal>
    )
}

export default InvitePeopleModal;