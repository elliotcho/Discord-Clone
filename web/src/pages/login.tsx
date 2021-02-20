import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { withApollo } from '../utils/withApollo';

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
    color: #000000;
    word-spacing: 2px;
`;
const Input = styled.input`
    display: block;
    width: 70%;
    margin: 3px auto;
    font-size: 16px;
    font-family: 'Gill Sans'
`;
const Button = styled.button`
    width: 40%;
    padding: 1%;
    margin: 9px auto;
    font-size: 20px;
    font-family: 'Permanent Marker', cursive;
    letter-spacing: 3px;
    background: #99bbad;
    border-radius: 19px;
`;


const Login : React.FC<{}> = () => {
   
    return(
        <Formik
            initialValues = {{ username: '', password: ''}}
            onSubmit = {async (values) => {
                const { username, password } = values;

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
                    </Container>
                </Form>
            )}  

        </Formik>
    )
}


export default withApollo({ ssr: false })(Login);