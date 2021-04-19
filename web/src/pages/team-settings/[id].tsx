import React from 'react';
import styled from 'styled-components';
import { useTeamQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';
import AuthWrapper from '../../containers/shared/AuthWrapper';
import EscapeColumn from '../../containers/shared/EscapeColumn';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: grid;
    grid-template-columns: 350px auto 250px;
    overflow-x: hidden;
    height: 100vh;
`;

const TeamSettings : React.FC<{}> =() => {
    const router = useRouter();
    let team = router.query.id as string;
    let teamId = parseInt(team);

    const { data } = useTeamQuery({
        variables: { teamId },
        skip: !teamId
    });

    return (
        <AuthWrapper requiresAuth>
             <Container>
                 <div style={{background: 'black'}}>

                 </div>

                 <div></div>
               
                <EscapeColumn />
            </Container>
        </AuthWrapper>
    )
}

export default withApollo({ ssr: false })(TeamSettings);