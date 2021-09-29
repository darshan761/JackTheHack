import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../LandingPage/Header';
import MainFeaturedPost from '../LandingPage/MainFeaturedPost';
import Grid from '@material-ui/core/Grid';
import DigitalVaultTiles from './DigitalVaultTiles';



export default function DigitalVault() {
   
    return (
      <React.Fragment>
        <CssBaseline />     
         <Container maxWidth="lg">
          <Header title="Market Place" />
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={2} align="center">
              <DigitalVaultTiles/>
            </Grid>
          </main>
        </Container>
      <br/>
    </React.Fragment> 
  );
}

const mainFeaturedPost = {
  title: 'DigitalVault',
  description:
    "Store all your information at one place. Be Safey & Secured by AIR DASH Platform.",
  image: 'https://miro.medium.com/max/480/1*JPgnhoJBXyprgbmRQdihYA.gif',
  imgText: 'Employee Profile',
  linkText: 'Continue reading…',
};