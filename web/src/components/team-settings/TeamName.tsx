import React, { useState } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { useEditTeamNameMutation } from '../../generated/graphql';
import EditModal from '../shared/EditModal';

const Container = styled.div`
    margin-top: 30px;
`;

const Title = styled.div`
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: #999;
`;

const Flex = styled.div`
    display: flex;
    background: #333;
    align-items: center;
    color: #f2f2f2;
    padding: 12px;
`;  

const Box = styled.div`
    margin-left: auto;
`;

const Button = styled.button`
    border: none;
    cursor: pointer;
    font-size: 1.0rem;
    background: #6c757d;
    color: #f2f2f2;
    outline: none;

    &:hover {
        background: #999;
    }
`;

interface TeamNameProps {
    isOwner: boolean;
    teamId: number;
    name: string;
}

const TeamName: React.FC<TeamNameProps> = ({
    isOwner,
    teamId,
    name
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editTeamName] = useEditTeamNameMutation();

    return (
        <Container>
            <Title>Team Name</Title>

            <Flex>
                {name}

                {isOwner && (
                    <Box>
                        <Button
                            onClick = {() => {
                                setIsOpen(true);
                            }}
                        >
                            Edit Name
                        </Button>
                    </Box>
                )}
            </Flex>

            <EditModal
                size = 'sm'
                content = {name}
                isOpen = {isOpen}
                title = 'Edit channel name'
                onClose = {() => setIsOpen(false)}
                onSave = {async (newName: string) => {
                    await editTeamName({
                        variables: { teamId, newName },
                        update: (cache, { data }) => {
                            if(data?.editTeamName) {
                                cache.writeFragment({
                                    id: 'Team:' + teamId,
                                    data: { name: newName },
                                    fragment: gql`
                                        fragment _ on Team {
                                            name
                                        }
                                    `
                                });
                            }
                        }
                    });
                }}
            />
        </Container>
    )
}

export default TeamName;