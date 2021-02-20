import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { useRegisterMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Input = styled.input``;

const Register: React.FC<{}> = () => {
    const [register] = useRegisterMutation();

    return (
        <Formik
            initialValues = {{ username: '', password: '', email: '' }}
            onSubmit = {async (values) => {
                const { username, password, email } = values;

                const response = await register({
                    variables: { username, password, email }
                });

                console.log(response);
            }}
        >
            {({ values, handleChange }) => (
                <Form>
                    <Input
                        type = 'text'
                        placeholder = 'Email'
                        onChange = {handleChange}
                        value = {values.email}
                        name = 'email'
                    />

                    <input
                        type = 'text'
                        placeholder = 'Username'
                        onChange = {handleChange}
                        value = {values.username}
                        name = 'username'
                    />

                    <input
                        type = 'password'
                        placeholder = 'Password'
                        onChange = {handleChange}
                        value = {values.password}
                        name = 'password'
                    />

                    <button type='submit'>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )   
}

export default withApollo({ ssr: false })(Register);