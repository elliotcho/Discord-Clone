import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { useTeamsQuery } from '../../generated/graphql';
import CreateTeamModal from './CreateTeamModal';
import NextLink from 'next/link';

const Container = styled.div`
    background: #4d4d4d;
    padding: 20px 20px;
`;

const TeamIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: #333;
    color: #fff;
    font-size: 24px;
    border-radius: 11px;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
       background: #a6a6a6;
    }
`;

const Teams: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useTeamsQuery();

    return (
        <Container>
            <NextLink href='/friends'>
                <TeamIcon>
                    <FontAwesomeIcon icon={faDiscord}/>
                </TeamIcon>
            </NextLink>

            {data?.teams?.map(t => {
                const route = `/view-team/${t.id}`;
                
                return (
                    <NextLink key={t.id} href={route}>
                        <TeamIcon>
                            {t.name[0].toUpperCase()}
                        </TeamIcon>
                    </NextLink>   
                )
            })}

            <TeamIcon onClick={() => setIsOpen(true)}>
                +
            </TeamIcon>

            <CreateTeamModal
                isOpen={isOpen}
                onClose = {() => setIsOpen(false)}
            />
        </Container>
    )
}

export default Teams;