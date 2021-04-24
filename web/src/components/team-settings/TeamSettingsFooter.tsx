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

const Kick = styled.button`
    color: #fff;
    padding: 5px 10px;
    background: orangered;
    font-size: 1.1rem;
    cursor: pointer;
    outline: none;
    border: none;

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
                    <Danger>
                        Transfer Ownership
                    </Danger>
                )}
            </Wrapper>

            <MembersModal
                isOpen = {openView}
                onClose = {() => setIsOpenView(false)}
                teamId = {teamId}
            >
                <Kick>Kick</Kick>
            </MembersModal>
        </Container>
    )
}

export default TeamSettingsFooter;