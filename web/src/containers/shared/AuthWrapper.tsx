import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import { useRouter } from 'next/router';

interface AuthWrapperProps {
    requiresAuth? : boolean;
}

const AuthWrapper : React.FC<AuthWrapperProps> = ({ children, requiresAuth = false }) => {
    const router = useRouter();

    const { data, loading } = useMeQuery({
        skip: isServer()
    });

    if(!loading) {
        if(data?.me && !requiresAuth) {
            router.push('/friends');
        }

        else if(!data?.me && requiresAuth) {
            router.push('/login');
        }

        else {
            return (
                <>
                    {children}
                </>
            )
        }
    }

    return <></>
}

export default AuthWrapper;