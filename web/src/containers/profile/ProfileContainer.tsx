import React from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
import { useChangeUsernameMutation } from '../../generated/graphql';
import { useMeQuery } from '../../generated/graphql';
=======
import { 
    MeDocument, 
    useMeQuery, 
    useUpdateProfilePicMutation 
} from '../../generated/graphql';
>>>>>>> upstream/master

const Container = styled.div`
    background: #222831;
    color: #e6e6e6;
    padding: 3%;
`;

const Intro = styled.h1`
    font-family: 'Caveat', cursive;
    font-size: 30px;
`;

const Image = styled.img`
    width: 6rem;
    height: 6rem;
`;

const Edit = styled.div`
    margin-top: 60px;
    padding: 2%;
`;

const UpdatePic = styled.form`
    width: 46%;
    padding: 2%;
    margin: 6px 0 20px;
    border-radius: 14px;
    border: solid 2px #a6f6f1;
    background: #5c969e;
    font-family: 'Nunito', sans-serif;
`;
const ChangeUsername = styled.form`
    width: 46%;
    margin: 6px 0 20px;
    padding: 2%;
    border-radius: 14px;
    border: solid 2px #ccf6c8;
    background: #5c6e91;
    font-family: 'Nunito', sans-serif;
`;
const ChangeEmail = styled.form`
    width: 46%;
    margin: 6px 0 20px;
    padding: 2%;
    border-radius: 14px;
    border: solid 2px #a4b787;
    background: #184d47;
    font-family: 'Nunito', sans-serif;
`;
const ChangePassword = styled.form`
    width: 46%;
    margin: 6px 0 20px;
    padding: 2%;
    border-radius: 14px;
    border: solid 2px #070d59;
    background: #34626c;
    font-family: 'Nunito', sans-serif;
`;

const Label = styled.label`
    display: inline-block;
    width: 150px;
    text-align: left;
`;

const Input = styled.input`
    margin-left: 20px;
`;

const Button = styled.button`
    background: #a6f0c6;
    text-align: center;
    border-radius: 20px;
    border: solid;
    margin-left: 4px;
`;

const ProfileContainer: React.FC<{}> = () => {
    const { data } = useMeQuery();
    
    const [updatePic] = useUpdateProfilePicMutation({
        refetchQueries: [
            { query: MeDocument }
        ]
    });

    let username = data?.me?.username || 'Loading...';
    let imgURL = data?.me?.profileURL;

    const [newName] = useChangeUsernameMutation();


    return (
        <Container>
            <Image src={imgURL} alt='profile pic' />

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
                    
                <ChangePassword>
                    <Label htmlFor='password'>Change Password</Label>
                    <Input type='password' id='password' name='password' />
                    <Button type='submit'>✔️</Button>
                </ChangePassword>
            </Edit>
        </Container>
    )
}

export default ProfileContainer;