import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-responsive-modal';
import { useDmReadReceiptsQuery ,useMessageReadReceiptsQuery } from '../../generated/graphql';
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
    isDm: boolean;
}

const ReadReceiptModal : React.FC<ReadReceiptModalProps> = ({ isOpen, onClose, messageId, isDm }) => {
    const { data } = useMessageReadReceiptsQuery({
        variables: { messageId },
        skip: (
            !messageId || isDm
        )
    });

    const response = useDmReadReceiptsQuery({
        variables: { messageId },
        skip: (
            !messageId || !isDm
        )
    })

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
                        Read By
                    </Header>

                    {!isDm && data?.messageReadReceipts.map(u => 
                        <FriendCard
                            key = {u.id}
                            profileURL = {u.profileURL}
                            username = {u.username}
                            size = 'sm'
                        />
                    )}

                    {!isDm && !data?.messageReadReceipts.length && (
                        <Text>
                            No users available
                        </Text>
                    )}

                    {isDm && response?.data?.dmReadReceipts.map(u => 
                        <FriendCard
                            key = {u.id}
                            profileURL = {u.profileURL}
                            username = {u.username}
                            size = 'sm'
                        />
                    )}

                    {isDm && !response?.data?.dmReadReceipts.length && (
                        <Text>
                            No users available
                        </Text>
                    )}
                </Container>
        </Modal>
    )
}

export default ReadReceiptModal;