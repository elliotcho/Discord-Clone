import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import { toErrorMap } from '../utils/toErrorMap';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/AuthLayout';
import FormContainer from '../containers/auth/FormContainer';
import InputField from '../components/auth/InputField';
import ErrorText from '../components/auth/ErrorText';
import Button from '../components/auth/Button';
import Title from '../components/auth/Title';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const Link = styled.div`
    margin-top: 20px;
    text-align: center;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const Login : React.FC<{}> = () => {
    const router = useRouter();
    const [login] = useLoginMutation();
   
    return(
        <AuthWrapper>
            <Layout>
                <Formik
                    initialValues = {{ username: '', password: ''}}
                    onSubmit = {async (values, { setErrors }) => {
                        const { username, password } = values;

                        const response = await login({
                            variables: { username, password }
                        })

                        if(!response.data.login.user) {
                            setErrors(toErrorMap(response.data.login.errors));
                        } else {
                            router.push('/profile');
                        }
                    }}
                >
                    {({ values, errors, handleChange }) => (
                        <FormContainer
                            borderColor = '#fb743e'
                            bg = '#bd9354'
                        >
                            <Form>
                                <Title>
                                    Sign in to get started
                                </Title>
                            
                                <InputField
                                    type='text'
                                    placeholder='username'
                                    onChange= {handleChange}
                                    value= {values.username}
                                    name='username'
                                />
                            
                                <InputField 
                                    type='password'
                                    placeholder='password'
                                    onChange= {handleChange}
                                    value= {values.password}
                                    name='password'
                                />
                            
                                <Button bg='#99bbad'>
                                    Login
                                </Button>    
                            
                                <NextLink href='forgot-password'>
                                    <Link>Forgot password?</Link>
                                </NextLink> 

                                {Object.keys(errors).map(key => 
                                    <ErrorText>
                                        {`${key} error: ${errors[key]}`}
                                    </ErrorText>
                                )}
                            </Form>
                        </FormContainer>
                    )}  
                </Formik>
            </Layout>
        </AuthWrapper>
    )
}


export default withApollo({ ssr: false })(Login);