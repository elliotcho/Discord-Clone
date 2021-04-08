import React from 'react';
import styled from 'styled-components';
import { 
    useMeQuery,
    useUpdateProfilePicMutation
} from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

const Container = styled.div`
    display: flex;
    background: #262626;
    min-height: 160px;
    width: 50%;
    padding: 12px;
`;

const Image = styled.img`
    border-radus: 50%;
    height: 5rem;
    width: 5rem;
`;

const Header = styled.h2`
    margin-left: 15px;
    color: #f2f2f2;
`;

const Box = styled.div`
    margin-left: auto;
`;

const Button = styled.button`
    border: none;
    font-size: 1.2rem;
    background: #6c757d;
    box-shadow: 0 0 5px black;
    margin: 10px 15px;
    cursor: pointer;
    color: #f2f2f2;
    padding: 10px;

    &:focus {
        outline: none;
    }
`;  

const Input = styled.input`
    display: none;
`;

const ProfileCard: React.FC<{}> = () => {
    const { data } = useMeQuery({
        skip: isServer()
    });

    const [updatePic] = useUpdateProfilePicMutation();

    const profileURL = data?.me?.profileURL;
    const username = data?.me?.username;

    return (
        <Container>
            <Image src={profileURL} alt='pic'/>

            <Header>
                {username}
            </Header>

            <Box>
                <Button
                    onClick = {() => {
                        document
                            .getElementById('profilePic')
                            .click();
                    }}
                >
                    Upload
                </Button>
            </Box>

            <Input 
                id='profilePic'
                type = 'file'
                onChange = {async (e) => {
                    const file = e.target.files[0];

                    await updatePic({
                        variables: { file },
                        update: cache => {
                            cache.evict({ fieldName: 'me' });
                        }
                    })
                }}
            />
        </Container>
    )
}

export default ProfileCard;