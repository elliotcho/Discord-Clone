import React, { useState } from 'react';
import styled from 'styled-components';
import { useKickUserMutation, useChangeOwnerMutation } from '../../generated/graphql';
import ConfirmModal from '../shared/ConfirmModal';
import MembersModal from './MembersModal';

const Container = styled.div`
    margin-top: 50px;
`;

const Title = styled.div`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Wrapper = styled.div`
    margin-top: 30px;
`;

const ButtonStyles = `
    border: none;
    font-size: 1.2rem;
    margin-right: 30px;
    cursor: pointer;
    outline: none;
    color: #f2f2f2;
    padding: 5px;
`;  

const Success = styled.button`
    ${ButtonStyles}
    background: #5cb85c;

    &:hover {
        background: #33cc33;
    }
`;

const Danger = styled.button`
    ${ButtonStyles}
    background: #d9534f;

    &:hover {
        background: #ff0000;
    }
`;

const ModalButtonStyles = `
    color: #fff;
    padding: 5px 10px;
    font-size: 1.0rem;
    cursor: pointer;
    outline: none;
    border: none;
`;

const Transfer = styled.button`
    ${ModalButtonStyles}
    background: #33cc33;

    &:hover {
        background: #5cb85c;
    }
`;

const Kick = styled.button`
    ${ModalButtonStyles}
    background: orangered;

    &:hover {
        background: #ff0000;
    }
`;


interface TeamSettingsFooterProps {
    isOwner: boolean;
    teamId: number;
    name: string;
}

const TeamSettingsFooter : React.FC<TeamSettingsFooterProps> = ({
    isOwner,
    teamId,
    name
}) => {
    const [openView, setIsOpenView] = useState(false);
    const [openConfirmKick, setOpenConfirmKick] = useState(false);
    const [openConfirmTransfer, setOpenConfirmTransfer] = useState(false);
    const [openTransfer, setIsOpenTransfer] = useState(false);

    const [changeOwner] = useChangeOwnerMutation();
    const [kickUser] = useKickUserMutation();

    return (    
        <Container>
            <Title>Member Settings</Title>

            <Wrapper>
                <Success
                    onClick = {() => {
                        setIsOpenView(true);
                    }}
                >
                    View Members
                </Success>

                {isOwner && (
                    <Danger
                        onClick = {() => {
                            setIsOpenTransfer(true);
                        }}
                    >
                        Transfer Ownership
                    </Danger>
                )}
            </Wrapper>

            <MembersModal
                isOpen = {openView}
                onClose = {() => setIsOpenView(false)}
                teamId = {teamId}
                name = {name}
            >
                {isOwner && (
                    <Kick
                        onClick = {() => {
                            setOpenConfirmKick(true);
                        }}
                    >
                        Kick
                    </Kick>
                )}
            </MembersModal>

            <MembersModal
                isOpen = {openTransfer}
                onClose = {() => setIsOpenTransfer(false)}
                teamId = {teamId}
                name = {name}
            >
                {isOwner && (
                     <Transfer
                        onClick = {() => {
                            setOpenConfirmTransfer(true);
                        }}
                     >
                         Transfer
                     </Transfer>
                )}
            </MembersModal>

            <ConfirmModal
                isOpen = {openConfirmKick}
                title = 'Are you sure you want to kick this user?'
                onClose = {() => setOpenConfirmKick(false)}
                onSave = {async () => {
                 
                }}
            />

            <ConfirmModal
                isOpen = {openConfirmTransfer}
                title = 'Are you sure you want to transfer ownership?'
                onClose = {() => setOpenConfirmTransfer(false)}
                onSave = {async () => {
                    
                }}
            />
        </Container>
    )
}

export default TeamSettingsFooter;