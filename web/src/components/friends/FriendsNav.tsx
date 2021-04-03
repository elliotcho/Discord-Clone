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

const FriendsNav: React.FC<{}> = () => { 
    return (
        <Container>
            <Nav>Friends</Nav>

            <Nav>Online</Nav>

            <Nav>All</Nav>

            <Nav>Pending</Nav>

            <NextLink href='/friends/search'>
                <Button>
                    Add Friend
                </Button>
            </NextLink>
        </Container> 
    )
}

export default FriendsNav;