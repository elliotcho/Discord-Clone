import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { 
    useDeleteDirectMessageMutation,
    useDeleteMessageMutation,
    useEditMessageMutation 
} from '../../generated/graphql';
import EditModal from './EditModal';

const Box = styled.div`
    font-size: 1.8rem;
    margin: 0 15px 15px auto;
    font-weight: bold;
    cursor: pointer;
`;

const Dropdown = styled.div`
    z-index: 1;
    display: none;
    min-width: 160px;
    position: absolute;
    background: #000;
    color: white;
    box-shadow: 0 0 5px black;
    right: 25px;
    top: 55px;
    ${Box}:hover & {
        display: block;
    }
`;

const Option = styled.div`
    margin: 12px;
    display: flex;
    padding: 10px 20px;
    font-weight: normal;
    font-size: 1rem;
    &:hover {
        background: #9999ff;
        color: #f2f2f2;
    }
`;

const Text = styled.div`
    margin-left: 15px;
`;

interface MessageSettingsProps {
    messageId: number;
    text: string;
    isDm: boolean;
}

const MessageSettings: React.FC<MessageSettingsProps> = ({ messageId, text, isDm }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [editMessage] = useEditMessageMutation();
    const [deleteMessage] = useDeleteMessageMutation();
    const [deleteDm] = useDeleteDirectMessageMutation();

    return (
        <Box>
            ...

            <Dropdown>
                <Option
                    onClick = {async () => {
                        if(isDm) {
                            await deleteDm({
                                variables: { messageId },
                                update: (cache) => {
                                    cache.evict({ fieldName: 'directMessages' });
                                }
                            });

                            return;
                        } 

                        await deleteMessage({
                            variables: { messageId },
                            update: (cache) => {
                                cache.evict({ fieldName: 'messages' });
                            }
                        })
                    }}
                >
                    <FontAwesomeIcon icon={faTrashAlt}/>

                    <Text>
                        Delete
                    </Text>
                </Option>

               {text && (
                    <Option
                        onClick = {() => {
                            setIsOpen(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faEdit} />

                        <Text>
                            Edit
                        </Text> 
                    </Option>
               )}
            </Dropdown>

            <EditModal
                isOpen = {isOpen}
                content = {text}
                onClose = {() => setIsOpen(false)}
                onSave = {async (newText) => {
                    if(!isDm) {
                        await editMessage({
                            variables: { messageId, text: newText },
                            update: (cache) => {
                                cache.evict({ fieldName: 'messages' });
                            }
                        });
                    }
                }}
            />
        </Box>
    )
}

export default MessageSettings;