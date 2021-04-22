import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTrashAlt, 
    faEdit, 
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { 
    useEditDirectMessageMutation,
    useDeleteDirectMessageMutation,
    useDeleteMessageMutation,
    useEditMessageMutation 
} from '../../generated/graphql';
import ReadReceiptModal from './ReadReceiptModal';
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
    right: 25px;
    top: 0px;
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
    channelId: number | undefined;
    text: string;
}

const MessageSettings: React.FC<MessageSettingsProps> = ({ messageId, channelId, text }) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openReadReceipts, setOpenReadReceipts] = useState(false);

    const [editMessage] = useEditMessageMutation();
    const [deleteMessage] = useDeleteMessageMutation();
    const [deleteDm] = useDeleteDirectMessageMutation();
    const [editDm] = useEditDirectMessageMutation();

    return (
        <Box>
            ...

            <Dropdown>
                <Option
                    onClick = {() => {
                        setOpenReadReceipts(true);
                    }}
                >
                    <FontAwesomeIcon icon={faUsers} />

                    <Text>
                        Read By
                    </Text>
               </Option>

                <Option
                    onClick = {async () => {
                        if(!channelId) {
                            await deleteDm({
                                variables: { messageId },
                                update: (cache) => {
                                    cache.evict({ fieldName: 'directMessages' });
                                }
                            });

                            return;
                        } 

                        await deleteMessage({
                            variables: { messageId, channelId },
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
                            setOpenEditModal(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faEdit} />

                        <Text>
                            Edit
                        </Text> 
                    </Option>
               )}
            </Dropdown>

            <ReadReceiptModal
                isOpen = {openReadReceipts}
                onClose = {() => setOpenReadReceipts(false)}
                messageId = {messageId}
            />

            <EditModal
                content = {text}
                isOpen = {openEditModal}
                onClose = {() => setOpenEditModal(false)}
                title = 'Edit your message'
                onSave = {async (newText) => {
                    if(channelId) {
                        await editMessage({
                            variables: { 
                                text: newText,
                                messageId,
                                channelId
                            },
                            update: (cache) => {
                                cache.evict({ fieldName: 'messages' });
                            }
                        });

                        return;
                    }

                    await editDm({
                        variables: { messageId, text: newText },
                        update: (cache) => {
                            cache.evict({ fieldName: 'directMessages' });
                        }
                    })
                }}
            />
        </Box>
    )
}

export default MessageSettings;