import React, { useState } from 'react';
import styled from 'styled-components';
import { useLeaveTeamMutation, useDeleteTeamMutation} from '../../generated/graphql';
import ConfirmModal from '../../components/shared/ConfirmModal';
import { useRouter } from 'next/router';

const Container = styled.div`
    background: #262626;
    display: flex;
`;

const Box = styled.div`
    margin: 50px 30px 0 auto;
    max-width: 240px;
`;

const Ul = styled.ul`
    width: 100%;
    color: #f2f2f2;
`;

const Li = styled.li`
    cursor: pointer;
    font-size: 1.1rem;
    list-style-type: none;
    padding: 10px 20px;
    color: #f2f2f2;

    &:hover {
        background: #404040;
    }
`;

interface TeamSidebarProps {
    isOwner: boolean;
    teamId: number;
}

const TeamSidebar: React.FC<TeamSidebarProps> = ({ 
    isOwner,
    teamId
}) => {
    const [openDeleteTeam, setOpenDeleteTeam] = useState(false);
    const [openLeaveTeam, setOpenLeaveTeam] = useState(false);
    const [deleteTeam] = useDeleteTeamMutation();
    const [leaveTeam] = useLeaveTeamMutation();
    const router = useRouter();

    return (
        <Container>
            <Box>
                <Ul>
                    {isOwner && (
                        <Li 
                            style={{ color: '#e60000'}}
                            onClick = {() => {
                                setOpenDeleteTeam(true);
                            }}
                        >
                            Delete Team
                        </Li>
                    )}

                    {!isOwner && (
                         <Li 
                            style={{ color: '#e60000'}}
                            onClick = {() => {
                                setOpenLeaveTeam(true);
                            }}
                        >
                            Leave Team
                        </Li>
                    )}
                </Ul>
            </Box>

            <ConfirmModal
                isOpen = {openLeaveTeam}
                title = 'Are you sure you want to leave this team?'
                onClose = {() => setOpenLeaveTeam(false)}
                onSave = {async () => {
                   await leaveTeam({
                       variables: { teamId },
                       update: (cache) => {
                           cache.evict({ fieldName: 'teams' });
                       }
                   });

                   router.push('/friends');
                }}
            />

            <ConfirmModal
                isOpen = {openDeleteTeam}
                title = 'Are you sure you want to delete this team?'
                onClose = {() => setOpenDeleteTeam(false)}
                onSave = {async () => {
                   await deleteTeam({
                       variables: { teamId },
                       update: (cache) => {
                           cache.evict({ fieldName: 'teams' });
                       }
                   });

                   router.push('/friends');
                }}
            />
        </Container>
    )
}

export default TeamSidebar;