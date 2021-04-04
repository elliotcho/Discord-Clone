import React from 'react';
import styled from 'styled-components';
import { useDirectMessagesQuery } from '../../generated/graphql';

const Container = styled.div`
    display: flex;
    height: auto;
    flex-direction: column-reverse;
    background: #808080;
    overflow-x: hidden;
    overflow-y: auto;
`;

interface MessageContainerProps {
    userId: number;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ userId: receiverId }) => {
    const { data } = useDirectMessagesQuery({
        variables: { receiverId }
    });

    return (
        <Container>
           {data?.directMessages.map(m => {
               if(m.pic) {
                   return (
                       <img src={m.pic} alt='pic' width='100' height='100'/>
                   )
               }

               return <h1>{m.text}</h1>
           })}
        </Container>
    )
}

export default MessageContainer;