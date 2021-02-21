import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import NextLink from 'next/link';

const Container = styled.div`
    width: 40%;
    margin: 11% auto;
    padding: 1.2rem;
    background: #bd9354;
    border: 3px outset #fb743e;
    border-radius: 16px;
    text-align: center;
    font-family: 'Caveat', cursive;
    font-size: 21px;
    word-spacing: 2px;
    color: #000000;
`;

const Input = styled.input`
    display: block;
    width: 70%;
    margin: 5px auto;
    font-size: 17px;
    font-family: 'Shadows Into Light', cursive;
    font-weight: 900;
    letter-spacing: 3px;
    border-radius: 10px;
    outline: none;
`;
const Button = styled.button`
    width: 40%;
    padding: 1%;
    margin: 14px auto 4px;
    font-size: 20px;
    font-family: 'Permanent Marker', cursive;
    letter-spacing: 3px;
    background: #99bbad;
    border-radius: 19px;
    outline: none;
`;


const Login : React.FC<{}> = () => {
    const [login] = useLoginMutation();
   
    return(
        <Formik
            initialValues = {{ username: '', password: ''}}
            onSubmit = {async (values) => {
                const { username, password } = values;

                const response = await login({
                    variables: { username, password }
                })

                console.log(response);
                
            }}
        >
            {({ values, handleChange }) => (
                <Form>
                    <Container>
                        <h1>Sign in to get started</h1>
                        <Input
                            type='text'
                            placeholder='username'
                            onChange= {handleChange}
                            value= {values.username}
                            name='username'
                        />
                        <Input 
                            type='password'
                            placeholder='password'
                            onChange= {handleChange}
                            value= {values.password}
                            name='password'
                        />
                        <Button type='submit'>
                            Login
                        </Button>    

                        <NextLink href='forgot-password'>
                            <p> Forgot password? </p>
                        </NextLink> 
                    </Container>
                </Form>
            )}  

        </Formik>
    )
}


export default withApollo({ ssr: false })(Login);