import React from 'react';
import styled from 'styled-components';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

const Container = styled.div`
    background: #222831;
    color: #e6e6e6;
    padding: 3%;
`;

const Edit = styled.div`
    width: 50%;
    background: #0f1123;
    margin: 91px 20px;
    padding: 1%;
    border-radius: 50px;
`;

const Form = styled.form`
    margin: 20px;
`;

const Label = styled.label`
    text-align: left;
    margin: 0 30px 10px 0;
`;

const Button = styled.button`
    background: #a6f0c6;
    text-align: center;
    border-radius: 20px;
    border: solid;
`;



const ProfileContainer: React.FC<{}> = () => {
    const { data } = useMeQuery();

    let username = data?.me?.username || 'Loading...';

    return (
        <Container>
            <h2> Whagwan, {username} </h2>
            
            <Edit>
                <Form>
                    <Label htmlFor="myFile">update profile picture</Label>
                    <input type="file" id="myFile" name="myFile" />
                </Form>
               
                <Form>
                    <Label htmlFor="usernane">change username</Label>
                    <input type='username' id='username' name='username' />
                    <Button type='submit'>✔️</Button>
                </Form>

                <Form>
                    <Label htmlFor='email'>change email</Label>
                    <input type='email' id='email' name='email' />
                    <Button type='submit'>✔️</Button>
                </Form>
                
            </Edit>

        
        </Container>
    )
}

export default ProfileContainer;