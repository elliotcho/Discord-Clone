import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import NextLink from 'next/link';

const Container = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0px;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    background: #737373;
    padding: 12px;
    color: white;
`;

const Image = styled.img`
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
`;

const Text = styled.div`
    margin-left: 15px;
`;

const Box = styled.div`
    margin-left: auto;
    margin-right: 5px;
    cursor: pointer;

    &:hover {
        color: #e6e6e6;
    }
`;

const UserNav: React.FC<{}> = () => {
    const { data } = useMeQuery({
        skip: isServer()
    });

    const profileURL = data?.me?.profileURL;
    const username = data?.me?.username;

    return (
        <Container>
            <Flex>
                <Image src={profileURL} alt='user'/>

                <Text>
                    {username}
                </Text>

                <NextLink href='/profile'>
                    <Box>
                        <FontAwesomeIcon icon={faCog} /> 
                    </Box>
                </NextLink>
            </Flex>
        </Container>
    )
}

export default UserNav;