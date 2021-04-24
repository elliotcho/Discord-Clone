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

const ButtonWrapper = styled.div`
    display: inline-block;
`;

interface MembersModalProps {
    isOpen: boolean;
    onClose(): void;
    onSave(id: number): void;
    teamId: number;
    name: string;
}

const MembersModal : React.FC<MembersModalProps> = ({ 
    children,
    isOpen, 
    onSave,
    onClose, 
    teamId, 
    name
}) => {
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
                        {name}
                    </Header>

                    {data?.members.map(u => 
                        <FriendCard
                            key = {u.id}
                            profileURL = {u.profileURL}
                            username = {u.username}
                            size = 'sm'
                        >
                            {!u.isMe && (
                                <ButtonWrapper
                                    onClick = {() => {
                                        onSave(u.id)
                                    }}
                                >
                                    {children}
                                </ButtonWrapper>
                            )}
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