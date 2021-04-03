import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 15px;
    border-bottom: 1px solid black;
    display: flex;
`;

const Nav = styled.div`
    cursor: pointer;
    margin-right: 30px;
    color: #d9d9d9;
    padding: 5px;

    &:hover {
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

            <Button>
                Add Friend
            </Button>
        </Container> 
    )
}

export default FriendsNav;