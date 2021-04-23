import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';
import { useReadReceiptsQuery } from '../../generated/graphql';
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


interface ReadReceiptModalProps {
    isOpen: boolean;
    messageId: number;
    onClose(): void;
}

const ReadReceiptModal : React.FC<ReadReceiptModalProps> = ({ isOpen, onClose, messageId }) => {
    const { data } = useReadReceiptsQuery({
        variables: { messageId },
        skip: !messageId
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

                    {data?.readReceipts.map(u => 
                        <FriendCard
                            key = {u.id}
                            profileURL = {u.profileURL}
                            username = {u.username}
                            size = 'sm'
                        />
                    )}

                    {!data?.readReceipts.length && (
                        <Text>
                            No users available
                        </Text>
                    )}
                </Container>
        </Modal>
    )
}

export default ReadReceiptModal;