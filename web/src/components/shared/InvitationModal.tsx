import React from 'react';
import styled from 'styled-components';
import { useChannelsQuery, useAddChannelMemberMutation } from '../../generated/graphql';
import { Modal } from 'react-responsive-modal';

const Container = styled.div`
    width: 400px;
`;

const Header = styled.h2`
    color: #404040;
`;
const Box = styled.div`
    margin-left: auto;
`;

const Input = styled.input`
    padding: 7px;
    font-size: 1.3rem;
    margin-bottom: 20px;
    width: 90%;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    font-size: 1.3rem;
    resize: none;
`;

const Flex = styled.div`
    display: flex;
    border-top: 1px solid gray;
    padding: 25px;
`;

const Footer = styled.div`
    margin-left: auto;
`;

const ButtonStyles = `
    color: white;
    margin-left: 15px;
    font-size: 20px;
    cursor: pointer;
    padding: 15px;
    outline: none;
    border: none;
`;

const Close = styled.button`
    ${ButtonStyles}
    background: gray;
    &:hover {
        background: #999;
    }
`;

const Submit = styled.button`
    ${ButtonStyles}
    background: green;
    &:hover {
        background: #009933;
    }
`;
interface InvitationModalProps{
    isOwner: boolean,
    isOpen: boolean,
    onClose(): void;
    teamId: number,
    title: string,
    userId: number;
}

const InvitationModal: React.FC<InvitationModalProps> =({
    isOwner,
    teamId,
    title,
    isOpen,
    onClose,
    userId
    
}) => {
    const data = useChannelsQuery({variables: {teamId}})
    const channels = data.data?.channels || [];
    const [addChannelMember] = useAddChannelMemberMutation();

    return(
        
        <Modal
            open = {isOpen}
            onClose = {onClose}
            closeOnEsc = {false}
            closeOnOverlayClick = {false}
            styles = {{
                closeButton: {outline: 'none'},
                modal: {background: '#b3b3b3'}
            }}
            >
                <Container>
                    <Header>{title}</Header>

                    
                    
                        //dynamically add checkboxes from the channels query above
                        <input type="checkbox" name='channel_list' value="C1">C1</input>
                        <input type="checkbox" name='channel_list' value="C2">C2</input>
                        <input type="checkbox" name='channel_list' value="C3">C3</input>
                        <Submit onClick = {async () =>{
                            for each c in channel_list(
                            await useAddChannelMemberMutation({
                                variables: { c.id, teamId, userId },
                                update: (cache) => {
                                    cache.evict({ fieldName: 'channel_member' });
                                }
                            });
                            )
                        }}>Invite</Submit>
                        
                    
                    
                    

                </Container>
            </Modal>
    )
}

export default InvitationModal;

