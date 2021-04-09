import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { useMeQuery, useSetStatusMutation } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import NextLink from 'next/link';

const Container = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0px;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    background: #737373;
    padding: 12px;
    color: white;
`;

const Image = styled.img`
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
`;

const Text = styled.div`
    margin-left: 15px;
`;

const Box = styled.div`
    margin-left: auto;
    margin-right: 5px;
    cursor: pointer;

    &:hover {
        color: #e6e6e6;
    }
`;

const Icon = styled.div`
    position: absolute;
    cursor: pointer;
    left: 45px;
    top: 45px;
`;

const Dropdown = styled.div`
    z-index: 1;
    display: block;
    cursor: pointer;
    min-width: 160px;
    position: absolute;
    box-shadow: 0 0 5px black;
    background: #d9d9d9;
    bottom: 65px;
    left: 0px;
`;

const Option = styled.div`
    margin: 12px;
    display: flex;
    padding: 10px 20px;
    font-weight: normal;
    font-size: 1rem;
    &:hover {
        background: #9999ff;
        color: #f2f2f2;
    }
`;

const Span = styled.span`
    margin-left: 15px;
    color: #404040;
`;

const icons = [
    { color: '#bfbfbf', text: 'Invisible', status: 0 },
    { color: '#cc0000', text: 'Do Not Disturb', status: 3 },
    { color: '#cccc00', text: 'Idle', status: 1 },
    { color: 'green', text: 'Online', status: 2 },
]

const UserNav: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [iconColor, setIconColor] = useState('#bfbfbf');
    const [setStatus] = useSetStatusMutation();
    
    const { data } = useMeQuery({
        skip: isServer()
    });

    useEffect(() => {

        const status = data?.me?.activeStatus;

        if(status) {
            icons.forEach(i => {
                if(i.status === status) {
                    setIconColor(i.color);
                }
            });
        }

    }, [data])

    if(!isServer()) {
        window.addEventListener('click', function(e: any){
            if(!document.getElementById('status-dropdown')?.contains(e.target)
                && !document.getElementById('icon')?.contains(e.target)
            ) {
                setIsOpen(false);
            }
        });
    }

    const profileURL = data?.me?.profileURL;
    const username = data?.me?.username;

    return (
        <Container>
            <Flex>
                <Image src={profileURL} alt='user'/>

                <Icon 
                    id='icon' 
                    onClick={() => setIsOpen(true)}
                    style = {{ color: iconColor }}
                >
                    <FontAwesomeIcon icon={faCircle} />
                </Icon>

                {isOpen && (
                    <Dropdown id='status-dropdown'>
                        {icons.map(({ status, color, text }) => 
                            <Option 
                                style={{ color }}
                                onClick = {async () => {
                                    setIconColor(color);

                                    await setStatus({
                                        variables: { status }
                                    });
                                }}
                            >
                                <FontAwesomeIcon icon={faCircle}/> 
                                
                                <Span>
                                    {text}
                                </Span>
                            </Option>  
                        )}
                    </Dropdown>
                )}

                <Text>
                    {username}
                </Text>

                <NextLink href='/profile'>
                    <Box>
                        <FontAwesomeIcon icon={faCog} /> 
                    </Box>
                </NextLink>
            </Flex>
        </Container>
    )
}

export default UserNav;