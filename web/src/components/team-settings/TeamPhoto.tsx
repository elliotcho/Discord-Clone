import React from 'react';
import styled from 'styled-components';
import { useUpdateTeamPhotoMutation, useRemoveTeamPhotoMutation } from '../../generated/graphql';

const Container = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    background: #262626;
    min-height: 100px;
    padding: 12px;
`;

const ImageWrapper = styled.div`
    cursor: pointer;
`;

const Image = styled.img`
    border-radius: 11px;
    height: 5rem;
    width: 5rem;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #bfbfbf;
    border-radius: 11px;
    font-size: 24px;
    color: #4d4d4d;
    height: 5rem;
    width: 5rem;
`;

const Box = styled.div`
    margin-left: auto;
`;

const Button = styled.button`
    border: none;
    font-size: 1.2rem;
    background: #6c757d;
    box-shadow: 0 0 5px black;
    cursor: pointer;
    outline: none;
    color: #f2f2f2;
    padding: 5px;
    &:hover {
        background: #999;
    }
`;  

const Remove = styled.button`
    position: absolute;
    background: #d9d9d9;
    border-radius: 50%;
    font-size: 1.4rem;
    cursor: pointer;
    outline: none;
    border: none;
    left: 70px;
    top: 5px;

    &:hover {
        background: #a6a6a6;
        color: white;
    }
`;

const Update = styled.div`
    opacity: 0.7;
    display: none;
    cursor: pointer;
    text-align: center;
    position: absolute;
    border-bottom-left-radius: 11px;
    border-bottom-right-radius: 11px;
    background: #d9d9d9;
    height: 2.5rem;
    width: 5rem;
    top: 60px;

    ${ImageWrapper}:hover & {
        display: block;
    }
`;

const Input = styled.input`
    display: none;
`;

interface TeamPhotoProps {
    teamId: number;
    isOwner: boolean;
    photo: string;
    name: string;
}

const TeamPhoto: React.FC<TeamPhotoProps> = ({
    teamId,
    isOwner,
    photo,
    name
}) => {
    let cursor = isOwner? 'pointer' : 'auto';

    const [updatePic] = useUpdateTeamPhotoMutation();
    const [removePic] = useRemoveTeamPhotoMutation();

    const openFile = (e: any) => {
        e.preventDefault();

        document
            .getElementById('teamPhoto')
                .click();
    };

    return (
        <Container>
           {photo && (
                <ImageWrapper 
                    style = {{ cursor }}
                    onClick={openFile}
                >  
                    <Image src={photo} alt='pic'/>

                    <Update>
                        Update
                    </Update>
                </ImageWrapper>
           )}

           {!photo && (
               <ImageWrapper 
                    style={{ cursor }}
                    onClick={openFile}
                >
                   <Icon>
                        {name[0].toUpperCase()}
                    </Icon>

                    <Update>
                        Update
                    </Update>
               </ImageWrapper>
           )}


            {photo && (
                <Remove
                    onClick = {async () => {
                        await removePic({
                            variables: { teamId },
                            update: (cache) => {
                                cache.evict({ id: 'Team:' + teamId });
                            }
                        })
                    }}
                >
                    X
                </Remove>
            )}

            <Box>
                <Button onClick={openFile}>
                    Upload
                </Button>
            </Box>

            <Input 
                id='teamPhoto'
                type = 'file'
                onChange = {async (e) => {
                    const file = e.target.files[0];

                    await updatePic({
                        variables: { file, teamId },
                        update: cache => {
                            cache.evict({ id: 'Team:' + teamId });
                        }
                    })
                }}
            />
        </Container>
    )
}

export default TeamPhoto;