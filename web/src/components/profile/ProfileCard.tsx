import React from 'react';
import styled from 'styled-components';
import { 
    useMeQuery,
    useUpdateProfilePicMutation,
    useRemoveProfilePicMutation
} from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

const Container = styled.div`
    display: flex;
    position: relative;
    background: #262626;
    min-height: 160px;
    padding: 12px;
`;

const ImageWrapper = styled.div`
    cursor: pointer;
`;

const Image = styled.img`
    border-radius: 50%;
    height: 5rem;
    width: 5rem;
`;

const Header = styled.h2`
    margin-left: 25px;
    color: #f2f2f2;
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
    margin: 15px;
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
    border-bottom-left-radius: 75px;
    border-bottom-right-radius: 75px;
    background: #d9d9d9;
    height: 2.5rem;
    width: 5rem;
    top: 53px;

    ${ImageWrapper}:hover & {
        display: block;
    }
`;

const Input = styled.input`
    display: none;
`;

const ProfileCard: React.FC<{}> = () => {
    const { data } = useMeQuery({
        skip: isServer()
    });

    const [updatePic] = useUpdateProfilePicMutation();
    const [removePic] = useRemoveProfilePicMutation();

    const hasProfilePic = !!data?.me?.profilePic;
    const profileURL = data?.me?.profileURL;
    const username = data?.me?.username;

    const openFile = (e: any) => {
        e.preventDefault();

        document
            .getElementById('profilePic')
                .click();
    };

    return (
        <Container>
            <ImageWrapper onClick = {openFile}>  
                <Image src={profileURL} alt='pic'/>

                <Update>
                    Update
                </Update>
            </ImageWrapper>


            {hasProfilePic && (
                <Remove
                    onClick = {async () => {
                        await removePic({
                            update: (cache) => {
                                cache.evict({ fieldName: 'me' });
                            }
                        })
                    }}
                >
                    X
                </Remove>
            )}

            <Header>
                {username}
            </Header>

            <Box>
                <Button onClick={openFile}>
                    Upload
                </Button>
            </Box>

            <Input 
                id='profilePic'
                type = 'file'
                onChange = {async (e) => {
                    const file = e.target.files[0];

                    await updatePic({
                        variables: { file },
                        update: cache => {
                            cache.evict({ fieldName: 'me' });
                        }
                    })
                }}
            />
            
            <br /> 
        </Container>
    )
}

export default ProfileCard;