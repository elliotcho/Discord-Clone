import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    useSendFileMutation, 
    useSendMessageMutation,
    useStartTypingMessageMutation,
    useStopTypingMessageMutation
} from '../../generated/graphql';
import { handleEnterPress } from '../../utils/handleEnterPress';

const Container = styled.div`
    display: grid; 
    grid-template-columns: 50px auto;
    background: #595959;
    grid-gap: 30px;
    padding: 20px;
`;

const Button = styled.button`
    color: white;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.4rem;
    background: #a6a6a6;
    border-radius: 50%;
    cursor: pointer;
    border: none;

    &:hover {
        box-shadow: 0 0 5px black;
    }

    &:focus {
        outline: none;
    }
`;

const Input = styled.input`
    display: none;
`;

const Textarea = styled.textarea`
    width: 90%;
    height: 35px;
    max-height: 130px;
    background: #737373;
    font-family: 'Arial';
    border-radius: 11px;
    font-size: 1.8rem;
    overflow: hidden;
    color: #f2f2f2;
    resize: none;
    &:focus {
        outline: none;
    }
`;

let tO: any;

interface SendMessageProps {
    channelId: number;
}

const SendMessage: React.FC<SendMessageProps> = ({ channelId }) => {
    const [text, setText] = useState('');

    const [sendPicture] = useSendFileMutation();
    const [sendMessage] = useSendMessageMutation();
    const [startTyping] = useStartTypingMessageMutation();
    const [stopTyping] = useStopTypingMessageMutation();

    const handleStopTyping = async () => {
        await stopTyping({
            variables: { channelId }
        });
    }

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
                        variables: { file, channelId },
                        update: (cache) => {
                            cache.evict({ fieldName: 'messages'})
                        }
                    }); 
                }}
            />

            <Textarea
                value = {text}
                placeholder = 'Text Here'
                onChange = {async (e) => {

                    setText(e.target.value);

                    if(e.target.value) {
                        await startTyping({ variables: { channelId }});
                        if(tO) clearTimeout(tO);

                        tO = setTimeout(handleStopTyping, 5000);
                    }

                    else {
                        await handleStopTyping();
                    }

                }}
                onKeyDown = {async (e: any) => {
                    const submit = handleEnterPress(e);

                    if(submit) {
                        await handleStopTyping();

                        await sendMessage({
                            variables: { text, channelId },
                            update: (cache) => {
                                cache.evict({ fieldName: 'messages'})
                            }
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