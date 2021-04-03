import React from 'react';
import { Form, Formik } from 'formik';
import { useRegisterMutation } from '../generated/graphql';
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

const Register: React.FC<{}> = () => {
    const router = useRouter();
    const [register] = useRegisterMutation();

    return (
        <AuthWrapper>
            <Layout>
                <Formik
                    initialValues = {{ username: '', password: '', email: '' }}
                    onSubmit = {async (values, { setErrors }) => {
                        const { username, password, email } = values;

                        const response = await register({
                            variables: { username, password, email }
                        });

                        if(!response.data.register.user) {
                            setErrors(toErrorMap(response.data.register.errors));
                        } else {
                            router.push('/profile');
                        }
                    }}
                >
                    {({ values, handleChange, errors }) => (
                        <FormContainer
                            borderColor = '#91091e'
                            bg = '#709fb0'
                        >
                            <Form>
                                <Title>
                                    Sign up
                                </Title>
                                
                                <InputField
                                    type = 'text'
                                    placeholder = 'Email'
                                    onChange = {handleChange}
                                    value = {values.email}
                                    name = 'email'
                                />

                                <InputField
                                    type = 'text'
                                    placeholder = 'Username'
                                    onChange = {handleChange}
                                    value = {values.username}
                                    name = 'username'
                                />

                                <InputField
                                    type = 'password'
                                    placeholder = 'Password'
                                    onChange = {handleChange}
                                    value = {values.password}
                                    name = 'password'
                                />

                                <Button bg='#5aa469'>
                                    Register
                                </Button>

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

export default withApollo({ ssr: false })(Register);