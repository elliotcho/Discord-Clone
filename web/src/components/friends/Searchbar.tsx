import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

const Input = styled.input`
    width: 70%;
    margin: 30px;
    font-size: 1.3rem;
    background: #333;
    color: #d9d9d9;
    padding: 15px;

    &:focus {
        outline: none;
    }
`;

interface SearchbarProps {
    setQuery(q: string): void;
    query: string;
}

const Searchbar: React.FC<SearchbarProps> = ({ query, setQuery}) => {
    return (
        <Formik
            initialValues = {{ query }}
            onSubmit = {async ({ query }) => {
                setQuery(query);
            }}
        >
            {({ handleChange, values }) => (
                <Form>
                    <Input
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