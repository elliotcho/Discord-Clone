import React, { useState } from 'react';
import { Formik, Form } from 'formik'
import styled from 'styled-components';
import { useSearchResultsQuery } from '../../generated/graphql';

const Input = styled.input`
    width: 400px;
    display: block;
    margin: auto;
`;

const Searchbar : React.FC<{}> = () => {
    const [query, setQuery] = useState('');

    const { data, refetch } = useSearchResultsQuery({
        variables: { query },
        skip: !!query
    });

    return (
        <Formik
            enableReinitialize
            initialValues = {{ query }}
            onSubmit = {async ({ query }) => {
                setQuery(query);
                await refetch();

                console.log(data)
            }}
        >
            {({ handleChange, values }) => (
                <Form>
                    <Input
                        type = 'text'
                        value = {values.query}
                        placeholder = 'Search...'
                        onChange = {handleChange}
                        name = 'query'
                    />
                </Form>
            )}
        </Formik>
    )
}

export default Searchbar;