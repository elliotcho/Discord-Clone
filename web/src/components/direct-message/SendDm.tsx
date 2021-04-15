import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    useSendDmFileMutation,
    useSendDirectMessageMutation, 
    useStartTypingDmMutation,
    useStopTypingDmMutation
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

interface SendDmProps {
    userId: number;
}

const SendDm: React.FC<SendDmProps> = ({ userId: receiverId }) => {
    const [text, setText] = useState('');
    
    const [sendFile] = useSendDmFileMutation();
    const [sendText] = useSendDirectMessageMutation();
    const [startTyping] = useStartTypingDmMutation();
    const [stopTyping] = useStopTypingDmMutation();

    const handleStopTyping = async () => {
        await stopTyping({
            variables: { receiverId }
        });
    }

    return (
        <Container>
            <Button
                onClick = {() => {
                    document.getElementById('dmFile').click();
                }}
            >
                +
            </Button>

            <Input
                type = 'file'
                id = 'dmFile'
                onChange= {async (e) => {
                    const file = e.target.files[0];

                    await sendFile({
                        variables: { file, receiverId },
                        update: (cache) => {
                            cache.evict({ fieldName: 'directMessages' });
                        }
                    });
                }}
            />

            <Textarea
                value = {text}
                onChange = {async (e) => {

                    setText(e.target.value);

                    if(e.target.value) {
                        await startTyping({ variables: { receiverId }});
                        if(tO) clearTimeout(tO);

                        tO = setTimeout(handleStopTyping, 5000);
                    }

                    else {
                        await handleStopTyping();
                    }

                }}
                onKeyDown = {async (e) => {
                    const submit = handleEnterPress(e, 130);

                    if(submit) {
                        await sendText({
                            variables: { text, receiverId },
                            update: (cache) => {
                                cache.evict({ fieldName: 'directMessages' });
                            }
                        });

                        setText('');
                    }
                }}
            />
        </Container>
    )
}

export default SendDm;