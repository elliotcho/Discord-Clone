import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { useTeamsQuery, useCreateTeamMutation } from '../../generated/graphql';
import { formatCount } from '../../utils/formatCount';
import SubscriptionWrapper from '../../containers/shared/SubscriptionWrapper';
import EditModal from './EditModal';
import NextLink from 'next/link';

const Container = styled.div`
    background: #4d4d4d;
    padding: 20px 20px;
`;

const IconStyles = `
    position: relative;
    border-radius: 11px;
    margin-bottom: 20px;
    cursor: pointer;
    height: 50px;
    width: 50px;
`;

const Image = styled.img`
    ${IconStyles}
    position: fixed;

    &:hover {
        border: 1px solid #fff;
        box-sizing: border-box;
    }
`;

const TeamIcon = styled.div`
    ${IconStyles}

    display: flex;
    align-items: center;
    justify-content: center;
    background: #333;
    color: #fff;
    font-size: 24px;

    &:hover {
       background: #a6a6a6;
    }
`;

const Box = styled.div`
   color: white;
   background: orangered;
   border-radius: 11px;
   position: absolute;
   font-size: 0.8rem;
   font-weight: bold;
   padding: 2px 5px;
   right: -5px;
   top: -5px;
`;

const Teams: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [createTeam] = useCreateTeamMutation();
    const { data } = useTeamsQuery();

    return (
        <SubscriptionWrapper>
            <Container>
                <NextLink href='/friends'>
                    <TeamIcon>
                        <FontAwesomeIcon icon={faDiscord}/>
                    </TeamIcon>
                </NextLink>

                {data?.teams?.map(t => {
                    const route = `/view-team/${t.id}`;

                    if(t.photo) {
                        return (
                            <NextLink key={t.id} href={route}>
                                <TeamIcon>
                                    <Image src={t.photo} alt='team photo' />

                                    {!!t.unreadMessages && (
                                        <Box>
                                            {formatCount(t.unreadMessages)}
                                        </Box>
                                    )}
                                </TeamIcon>
                            </NextLink>
                        )
                    }
                    
                    return (
                        <NextLink key={t.id} href={route}>
                            <TeamIcon>
                                {t.name[0].toUpperCase()}

                                {!!t.unreadMessages && (
                                    <Box>
                                        {formatCount(t.unreadMessages)}
                                    </Box>
                                )}
                            </TeamIcon>
                        </NextLink>   
                    )
                })}

                <TeamIcon onClick={() => setIsOpen(true)}>
                    +
                </TeamIcon>

                <EditModal
                    size = 'sm'
                    isOpen = {isOpen}
                    title = 'Create Team'
                    onClose = {() => setIsOpen(false)}
                    onSave = {async (teamName) => {
                        await createTeam({ 
                            variables: { teamName },
                            update: (cache) => {
                                cache.evict({ fieldName: "teams" });
                            }
                        }
                    )}}
                />
            </Container>
        </SubscriptionWrapper>
    );
}

export default Teams;