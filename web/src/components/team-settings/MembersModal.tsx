import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';
import { useMembersQuery } from '../../generated/graphql';
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

interface MembersModalProps {
    isOpen: boolean;
    onClose(): void;
    teamId: number;
}

const MembersModal : React.FC<MembersModalProps> = ({ isOpen, onClose, teamId, children }) => {
    const { data } = useMembersQuery({
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
                        Members
                    </Header>

                    {data?.members.map(u => 
                        <FriendCard
                            key = {u.id}
                            profileURL = {u.profileURL}
                            username = {u.username}
                            size = 'sm'
                        >
                            {children}
                        </FriendCard>
                    )}

                    {!data?.members.length && (
                        <Text>
                            No users available
                        </Text>
                    )}
                </Container>
        </Modal>
    )
}

export default MembersModal;