import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

interface CreateTeamModalProps {
    isOpen: boolean;
    onClose() : void;
    onSave() : void;
}

const CreateTeamModal : React.FC<CreateTeamModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            open = {isOpen}
            closeOnEsc = {false}
            styles = {{ closeButton: { outline: 'none' } }}
            onClose = {onClose}
        >

        </Modal>
    )
}

export default CreateTeamModal;