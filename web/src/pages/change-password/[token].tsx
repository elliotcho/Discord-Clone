import React from 'react';
import { Formik, Form } from 'formik';
import { MeDocument, MeQuery, useChangePasswordMutation } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import { toErrorMap } from '../../utils/toErrorMap';
import Layout from '../../containers/shared/AuthLayout';
import AuthWrapper from '../../containers/shared/AuthWrapper';
import FormContainer from '../../containers/auth/FormContainer';
import Title from '../../components/auth/Title';
import InputField from '../../components/auth/InputField';
import Button from '../../components/auth/Button';
import ErrorText from '../../components/auth/ErrorText';
import { useRouter } from 'next/router';

const ChangePassword: React.FC<{}> = () => {
    const router = useRouter();
    const { token } = router.query;

    const [changePassword] = useChangePasswordMutation();

    return (
        <Layout>
            <Formik
                initialValues = {{ newPassword: '' }}
                onSubmit = {async ({ newPassword }, { setErrors }) => {
                    const response = await changePassword({
                        variables: {
                            token: typeof token === 'string'? token: '',
                            newPassword
                        },
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: 'Query',
                                    me: data?.changePassword.user
                                }
                            });
                        }
                    });

                    if(!response.data.changePassword.user) {
                        setErrors(toErrorMap(response.data.changePassword.errors));
                    } else {
                        router.push('/profile');
                    }
                }}
            >
                {({ values, handleChange, errors }) => (
                    <FormContainer
                        borderColor = 'lightgreen'
                        bg = 'turquoise'
                    >
                        <Form>
                            <Title>Enter new password</Title>

                            <InputField
                                type = 'password'
                                placeholder = 'New password'
                                onChange = {handleChange}
                                value = {values.newPassword}
                                name = 'newPassword'
                            />

                            <Button bg='#99bbad'>
                                Submit
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
    )
}

export default withApollo({ ssr: false })(ChangePassword);