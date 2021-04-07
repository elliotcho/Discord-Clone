import React from 'react';
import styled from 'styled-components';
import { 
    MeDocument, 
    useMeQuery, 
    useUpdateProfilePicMutation,
    useRemoveProfilePicMutation,
    useSetStatusMutation
} from '../../generated/graphql';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const Container = styled.div`
    background: #222831;
`;

const Flex = styled.div`
    display: flex;
    margin: 50px auto;
    width: 80%;
`;

const Box = styled.div`
    margin-left: auto;
`;

const Escape = styled.button`
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.4rem;
    border: solid 1px #e6e6e6;
    background: none;
    color: #e6e6e6;

    &:focus {
        outline: none;
    }

    &:hover {
        background: #d9d9d9;
        color: black;
    }
`;

// const Intro = styled.h1`
//     font-family: 'Caveat', cursive;
//     font-size: 30px;
// `;

// const Image = styled.img`
//     width: 6rem;
//     height: 6rem;
// `;

// const Remove = styled.button``;

// const Edit = styled.div`
//     margin-top: 60px;
//     padding: 2%;
// `;

// const UpdatePic = styled.form`
//     width: 46%;
//     padding: 2%;
//     margin: 6px 0 20px;
//     border-radius: 14px;
//     border: solid 2px #a6f6f1;
//     background: #5c969e;
//     font-family: 'Nunito', sans-serif;
// `;
// const ChangeUsername = styled.form`
//     width: 46%;
//     margin: 6px 0 20px;
//     padding: 2%;
//     border-radius: 14px;
//     border: solid 2px #ccf6c8;
//     background: #5c6e91;
//     font-family: 'Nunito', sans-serif;
// `;
// const ChangeEmail = styled.form`
//     width: 46%;
//     margin: 6px 0 20px;
//     padding: 2%;
//     border-radius: 14px;
//     border: solid 2px #a4b787;
//     background: #184d47;
//     font-family: 'Nunito', sans-serif;
// `;
// const ChangePassword = styled.form`
//     width: 46%;
//     margin: 6px 0 20px;
//     padding: 2%;
//     border-radius: 14px;
//     border: solid 2px #070d59;
//     background: #34626c;
//     font-family: 'Nunito', sans-serif;
//     cursor: pointer;
// `;

// const Label = styled.label`
//     display: inline-block;
//     width: 150px;
//     text-align: left;
// `;

// const Input = styled.input`
//     margin-left: 20px;
// `;

// const Button = styled.button`
//     background: #a6f0c6;
//     text-align: center;
//     border-radius: 20px;
//     border: solid;
//     margin-left: 4px;
// `;

const ProfileContainer: React.FC<{}> = () => {
    // const { data } = useMeQuery();
    // const [setStatus] = useSetStatusMutation();
    const router = useRouter();
    
    // const [updatePic] = useUpdateProfilePicMutation({
    //     refetchQueries: [{ query: MeDocument }]
    // });

    // const [removePic] = useRemoveProfilePicMutation({
    //     refetchQueries: [{ query: MeDocument }]
    // });


    // let username = data?.me?.username || 'Loading...';
    // let imgURL = data?.me?.profileURL;

    return (
        <Container>
            <Flex>
                <Box>
                    <Escape onClick={() => router.back()}>
                        X
                    </Escape>
                </Box>
            </Flex>

            {/* <Image src={imgURL} alt='profile pic' />
            
            <Remove
                onClick = {async () => {
                    //await removePic();
                    router.back();
                }}
            >
                X
            </Remove>

            <Intro> Whagwan, {username}</Intro>


            <Edit>
                <UpdatePic>
                    <Label>
                        Update Profile Picture
                    </Label>

                    <Input
                        id = 'myFile' 
                        type = 'file'
                        onChange = {async (e) => {
                            const file = e.target.files[0];
                            
                            await updatePic({
                                variables: { file }
                            });
                        }}
                    />
                </UpdatePic>
                
                <ChangeUsername>
                    <Label htmlFor="usernane">Change Username</Label>
                    <Input 
                        type='username' 
                        id='username' 
                        onChange={(e) => {
                            

                        }}
                        // value={}
                        name='username' 
                    />
                    <Button onClick={async (e) => {

                        
                    }}>✔️</Button>
        
                </ChangeUsername>

                <ChangeEmail>
                    <Label htmlFor='email'>Change Email</Label>
                    <Input type='email' id='email' name='email' />
                    <Button type='submit'>✔️</Button>
                </ChangeEmail>
                    
                <NextLink href='/forgot-password'>
                    <ChangePassword>
                        Change Password
                    </ChangePassword>
                </NextLink>
            </Edit> */}
        </Container>
    )
}

export default ProfileContainer;