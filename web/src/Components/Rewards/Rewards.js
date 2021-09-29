import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../LandingPage/Header';
import MainFeaturedPost from '../LandingPage/MainFeaturedPost';
import Grid from '@material-ui/core/Grid';
import RewardsTiles from './RewardsTiles';



export default function Rewards() {
   
    return (
      <React.Fragment>
        <CssBaseline />     
         <Container maxWidth="lg">
          <Header title="AIR DASH Rewards" />
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={2} align="center">
              <RewardsTiles/>
            </Grid>
          </main>
        </Container>
      <br/>
    </React.Fragment> 
  );
}

const mainFeaturedPost = {
  title: 'AIR DASH Points, Coupons & Rewards',
  description:
    "Redeem whenever & wherever you want !!",
  image: 'https://images.ctfassets.net/wob906kz2qeo/3HQHY3JUmywTaabMyNW0vX/61b6930b1b1da0071f01e54ca7a969d6/Recurly-Coupons-Unique-Bulk-BlogImage.gif',
  imgText: 'Points',
  linkText: 'Continue reading…',
};