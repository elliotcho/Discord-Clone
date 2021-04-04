import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/formatDate';
import MessageSettings from './MessageSettings';

const Container = styled.div`
    padding: 12px;
    position: relative;
    border: 1px solid black;
    background: #4d4d4d;
    color: #f2f2f2;

    &:last-child {
        border: none;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const CircleImage = styled.img`
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
`;

const Text = styled.div`
    margin-left: 15px;
`;

const Main = styled.div`
    font-size: 1.4rem;
    margin: 25px;
`;

const Image = styled.img`
    height: 10rem;
    width: 10rem;
`;

interface MessageProps {
    messageId: number;
    profileURL: string;
    username: string;
    isDm: boolean;
    date: string;
    text?: string;
    pic?: string;
}

const Message: React.FC<MessageProps> = ({
    messageId,
    profileURL,
    username,
    isDm,
    date,
    text,
    pic
}) => {
    return (
        <Container>
            <Header>
                <CircleImage src={profileURL} alt='user'/>

                <Text>
                    {username} {formatDate(date)}
                </Text>

                <MessageSettings 
                    messageId={messageId}
                    isDm = {isDm}
                />
            </Header>

            <Main>
                {pic && <Image src={pic} alt='content' />}
                {!pic && text}     
            </Main>
        </Container>
    )
} 

export default Message;