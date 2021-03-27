import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { useRegisterMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo'; 
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import { useRouter } from 'next/router';

const Container = styled.div`
    width: 40%;
    margin: 60px auto;
    padding: 1.2rem;
    background: #709fb0;
    border: 3px outset #91091e;
    border-radius: 16px;
    text-align: center;
    font-family: 'Caveat', cursive;
    font-size: 23px;
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
    background: #5aa469;
    border-radius: 19px;
    outline: none;
`;

const Register: React.FC<{}> = () => {
    const router = useRouter();
    const [register] = useRegisterMutation();

    return (
        <AuthWrapper>
            <Layout>
                <Formik
                    initialValues = {{ username: '', password: '', email: '' }}
                    onSubmit = {async (values) => {
                        const { username, password, email } = values;

                        const response = await register({
                            variables: { username, password, email }
                        });

                        if(response?.data?.register) {
                            router.push('/profile');
                        }
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form>
                            <Container>
                                <h1>Sign up</h1>
                                <Input
                                    type = 'text'
                                    placeholder = 'Email'
                                    onChange = {handleChange}
                                    value = {values.email}
                                    name = 'email'
                                />

                                <Input
                                    type = 'text'
                                    placeholder = 'Username'
                                    onChange = {handleChange}
                                    value = {values.username}
                                    name = 'username'
                                />

                                <Input
                                    type = 'password'
                                    placeholder = 'Password'
                                    onChange = {handleChange}
                                    value = {values.password}
                                    name = 'password'
                                />

                                <Button type='submit'>
                                    Register
                                </Button>
                            </Container>
                        </Form>
                    )}
                </Formik>
            </Layout>
        </AuthWrapper>
    )   
}

export default withApollo({ ssr: false })(Register);