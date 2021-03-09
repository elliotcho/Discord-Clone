import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { useForgotPasswordMutation } from '../generated/graphql'
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../components/shared/AuthWrapper';

const Container = styled.div`
    width: 50%;
    margin: 11% auto;
    padding: 1.2rem;
    background: #ffc478;
    border: 3px outset #d8c292;
    border-radius: 16px;
    font-family: 'Caveat', cursive;
    font-size: 19px;
    text-align: center;
    word-spacing: 2px;
    color: #000000;
`;

const Input = styled.input`
    width: 50%;
    margin: 10px auto;
    margin-top: 20px;
    font-size: 20px;
    font-family: 'Shadows Into Light', cursive;
    font-weight: 900;
    letter-spacing: 3px;
    border-radius: 10px;
    outline: none;
`;

const Button = styled.button`
    padding: 1%;
    margin-left: 10px;
    font-family: 'Permanent Marker', cursive;
    font-size: 14px;
    letter-spacing: 3px;
    background: #94b5c0;
    border-radius: 19px;
    outline: none;
`;

const ForgotPassword: React.FC<{}> = () => {
    const [forgotPassword] = useForgotPasswordMutation();

    return(
        <AuthWrapper>
            <Formik
                initialValues = {{ email: '' }}
                onSubmit = {async (values) => {
                    const { email } = values;

                    const response = await forgotPassword({
                        variables: { email }
                    })

                    console.log(response);
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <Container>
                            <h1>We'll send you an email to reset your password!</h1>
                            <Input 
                                type='email'
                                placeholder='email'
                                onChange= {handleChange}
                                value= {values.email}
                                name='email'
                            />
                            <Button type='submit'> Send</Button>
                        </Container>
                    </Form>
                )}
            </Formik>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(ForgotPassword);