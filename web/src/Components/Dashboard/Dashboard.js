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
                <h1>Cumulative Peek hours for Airport Sectors</h1>
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
    "Predective & Peeformance Analysis with graphical user interface providing at-a-glance views of key performance indicators (KPIs) relevant to airport management",
  image: 'https://datadrivendesign.net/assets/images/Customizable_dashboard_V1.gif',
  imgText: 'Employee Profile',
  linkText: 'Continue reading…',
};