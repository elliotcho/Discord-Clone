import React from 'react';
import styled from 'styled-components';
import { withApollo } from '../utils/withApollo';
import Layout from '../containers/shared/AuthLayout';

const Container = styled.div`
   background: #008ae6;
   overflow-x: hidden;
   height: 92vh;
`;

const Grid = styled.div`
   display: grid;
   margin: 30px;
`;

const TextStyles = `
   display: flex;
   margin-left: 50px;
   justify-content: center;
   font-family: 'Caveat', cursive;
   align-items: center;
   color: #f2f2f2;
`;

const Header = styled.h1`
   ${TextStyles}

   @media screen and (max-width: 858px) {
        display: none;
   }
`;

const Text = styled.div`
    ${TextStyles}

    font-size: 2.0rem;
    max-width: 600px;

    @media screen and (max-width: 1050px) {
       display: none;
   }
`;

const Image = styled.img`
    width: 600px;
`;

const Index : React.FC<{}> = () => {
  return (
     <Layout>
        <Container>
          <Grid style={{ gridTemplateColumns: '600px auto' }}>
               
               <Image src='/home_l.svg' alt='left side'/>
            

               <Header>
                   Your Place To Talk
               </Header>

          </Grid>

           <Grid style={{ gridTemplateColumns: 'auto 600px' }}>

              <Text>
                  Whether you’re part of a school club, gaming group, worldwide art community, 
                  or just a handful of friends that want to spend time together, 
                  Discord makes it easy to talk every day and hang out more often.
              </Text>
              
         
               <Image src='/home_r.svg' alt='right side'/>
            
           </Grid>
        </Container>
     </Layout>
  )
}

export default withApollo({ ssr: false })(Index);