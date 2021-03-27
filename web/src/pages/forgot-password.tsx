import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useForgotPasswordMutation } from '../generated/graphql'
import { withApollo } from '../utils/withApollo';
import AuthWrapper from '../containers/shared/AuthWrapper';
import Layout from '../containers/shared/Layout';
import FormContainer from '../containers/auth/FormContainer';
import InputField from '../components/auth/InputField';
import Button from '../components/auth/Button';
import Title from '../components/auth/Title';

const ForgotPassword: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();

    return(
        <Layout>
            <Formik
                initialValues = {{ email: '' }}
                onSubmit = {async ({ email }, { setValues }) => {
                    setIsLoading(true);

                    await forgotPassword({
                        variables: { email }
                    });

                    setValues({ email: '' });
                    setIsLoading(false);
                }}
            >
                {({ values, handleChange }) => (
                    <FormContainer
                        borderColor = '#d8c292'
                        bg = '#ffc478'
                    >
                        <Form>
                            <Title>
                                We'll send you an email to reset your password!
                            </Title>
                            
                            <InputField 
                                type='email'
                                placeholder='email'
                                onChange= {handleChange}
                                value= {values.email}
                                name='email'
                            />

                            <Button 
                                isLoading={isLoading}
                                bg='#94b5c0' 
                            > 
                                Send
                            </Button>
                        </Form>
                    </FormContainer>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(ForgotPassword);