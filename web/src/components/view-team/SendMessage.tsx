import React, { useState } from 'react';
import styled from 'styled-components';
import { MessagesDocument, useSendFileMutation, useSendMessageMutation } from '../../generated/graphql';
import { handleEnterPress } from '../../utils/handleEnterPress';

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

const Input = styled.input`
    display: none;
    `;

interface SendMessageProps {
    channelId: number;
}

const SendMessage: React.FC<SendMessageProps> = ({ channelId }) => {
    const [text, setText] = useState('');

    const [sendPicture] = useSendFileMutation();
    const [sendMessage] = useSendMessageMutation({
        refetchQueries: [ 
            { query: MessagesDocument, variables: { channelId } }
        ]
    });


    return (
        <Container>
            <Button 
                onClick= {() =>{
                    document.getElementById('picture').click();
                }}>
                +
            </Button>

            <Input 
                type= 'file'
                id= 'picture'
                onChange= {async (e) => {
                    const file = e.target.files[0]

                    await sendPicture({
                        variables: {file, channelId},
                        update: (cache) => {
                            cache.evict({ fieldName: 'messages'})
                        }
                    }); 
                }}
            />

            <Textarea
                value = {text}
                placeholder = 'Text Here'
                onChange = {(e) => setText(e.target.value)}
                onKeyDown = {async (e: any) => {
                    const submit = handleEnterPress(e);

                    if(submit) {
                        e.preventDefault();

                        await sendMessage({
                            variables: { text, channelId }
                        });

                        setText('');
                        return;
                    }
                }}
            />
        </Container>
    )
}

export default SendMessage;