import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from '../LandingPage/Header';
import MainFeaturedPost from '../LandingPage/MainFeaturedPost';
import Grid from '@material-ui/core/Grid';
import Viz from '../Viz/Viz';

export default function Dashboard() {
   
    return (
      <React.Fragment>
        <CssBaseline />     
         <Container maxWidth="lg">
          <Header title="Dashboard" />
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={2} align="center">
              <Viz/>
            </Grid>
          </main>
        </Container>
      <br/>
    </React.Fragment> 
  );
}

const mainFeaturedPost = {
  title: 'Dashboard',
  description:
    "Predective & Peeformance Analysis",
  image: 'https://assets0.domestika.org/course-images/000/019/250/19250-big.gif',
  imgText: 'Employee Profile',
  linkText: 'Continue reading…',
};