import { setUncaughtExceptionCaptureCallback } from 'node:process';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MessagesDocument, useSendMessageMutation } from '../../generated/graphql';

const Container = styled.div`
    display: grid;
    grid-template-columns: 50px auto;
    background: #4d4d4d;
    padding: 20px;
`;

const Button = styled.button`
    width: 35px;
    height: 35px;
    font-size: 20px;
    background: lightgray;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    outline:none;
    &:hover {
        background: white;
    }
`;

const Textarea = styled.textarea`
    height: 25px;
    max-height: 200px;
    font-size: 1.4rem;
    margin-left: 30px;
    resize: none;
`;

interface SendMessageProps {
    channelId: number;
}

const SendMessage: React.FC<SendMessageProps> = ({ channelId }) => {
    const [text, setText] = useState('');

    const [sendMessage] = useSendMessageMutation({
        refetchQueries: [ 
            { query: MessagesDocument, variables: { channelId } }
        ]
    });

    return (
        <Container>
            <Button>
                +
            </Button>

            <Textarea
                value = {text}
                placeholder = 'Text Here'
                onChange = {(e) => setText(e.target.value)}
                onKeyDown = {async (e: any) => {
                    if(e.keyCode === 13 && e.shiftKey === false) {
                        e.preventDefault();

                        await sendMessage({
                            variables: { text, channelId }
                        });

                        setText('');
                        return;
                    }

                    const { style } = e.target;

                    setTimeout(() => {
                        style.height = '';
                        style.height = e.target.scrollHeight + 'px';
                    }, 0);

                    if(e.target.scrollHeight <= 200) {
                        style.overflow = 'hidden';
                    } else {
                        style.overflow = 'auto';
                    }
                }}
            />
        </Container>
    )
}

export default SendMessage;