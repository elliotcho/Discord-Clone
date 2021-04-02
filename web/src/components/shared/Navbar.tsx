import React from 'react';
import styled from 'styled-components';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import NextLink from 'next/link';

const Container = styled.div`
    height: 8vh;
    display: flex;
    align-items: center;
    background: #333;
`;

const Box = styled.div`
    margin-left: auto;
    color: white;
`;

const Link = styled.span`
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 15px;
    &:hover {
        text-decoration: underline;
    }
`;

const Navbar: React.FC<{}> = () => {
    const { data, loading } = useMeQuery({
        skip: isServer()
    });

    let body: any;

    if(!loading) {
        if(!data?.me) {
            body = (
                <>
                    <NextLink href='/login'>
                        <Link>Login</Link>
                    </NextLink>

                    <NextLink href='/register'>
                        <Link>Register</Link>
                    </NextLink>
                </>
            );
        } else {
            body = (
                <>
                    <NextLink href='/profile'>
                        <Link>Profile</Link>
                    </NextLink>
                </>
            )
        }
    }

    return (
        <Container>
            <Box>
                {body}
            </Box>
        </Container>
    )
}

export default Navbar;