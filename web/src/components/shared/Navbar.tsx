import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import NextLink from 'next/link';

const Container = styled.div`
    display: flex;
    font-family: 'Caveat', cursive;
    align-items: center;
    background: #333;
    height: 8vh;
`;

const Icon = styled.div`
    margin: 15px;
    font-size: 2.0rem;
    cursor: pointer;
    color: #ccc;

    &:hover {
        color: #f2f2f2;
    }
`;

const Box = styled.div`
    margin-left: auto;
    color: #ccc;
`;

const Link = styled.span`
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 15px;
    &:hover {
        color: #f2f2f2;
    }
`;

const Navbar: React.FC<{}> = () => {
    return (
        <Container>
            <NextLink href='/'>
                <Icon>
                    <FontAwesomeIcon icon={faDiscord} />
                </Icon>
            </NextLink>

            <Box>
                <NextLink href='/login'>
                    <Link>Login</Link>
                </NextLink>

                <NextLink href='/register'>
                    <Link>Register</Link>
                </NextLink>
            </Box>
        </Container>
    )
}

export default Navbar;