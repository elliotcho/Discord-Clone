import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

const Container = styled.div`
    padding: 15px;
    border-bottom: 1px solid black;
    display: flex;
`;

const Nav = styled.div`
    margin-right: 30px;
    color: #d9d9d9;
    padding: 5px;

    &:not(:first-child) {
        cursor: pointer;
    }

    &:not(:first-child):hover {
        background: #4d4d4d;
    }
`;

const Button = styled.button`
    color: white;
    background: #00cc00;
    font-size: 1.1rem;
    cursor: pointer;
    outline: none;
    border: none;
`;

interface FriendsNavProps {
    type: string | string[];
}

const FriendsNav: React.FC<FriendsNavProps> = ({ type }) => { 
    const style = { background: '#4d4d4d' };

    return (
        <Container>
            <Nav>Friends</Nav>

            <NextLink href='/friends'>
                <Nav style={!type ? style: {}}>
                    Online
                </Nav>
            </NextLink>


            <NextLink href='/friends/all'>
                <Nav style={type === 'all' ? style: {}}>
                    All
                </Nav>
            </NextLink>

            <NextLink href='/friends/requests'>
                <Nav style={type === 'requests' ? style: {}}>
                    Pending
                </Nav>
            </NextLink>

            <NextLink href='/friends/search'>
                <Button>
                    Add Friend
                </Button>
            </NextLink>
        </Container> 
    )
}

export default FriendsNav;