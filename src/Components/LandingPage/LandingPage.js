import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Paper from '@material-ui/core/Paper';
import toast from 'react-hot-toast';



const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  search: {
    margin: theme.spacing(1),
    width: 600,
  },
  leaderBoard: {
    width: '100%',
    height: '400px',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderStyle: 'solid',
    borderColor: '#FDCB6B',
    borderRadius: '10px',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  leaderBoardParent: {

  },
  chart: {
    height: 10
  },
  divHeading: {
    color: '#593B90'
  },
  icon: {
    marginRight: theme.spacing(2),
    width: '40%',
    height: '40%',
    padding: '5%'
  },
}));


const mainFeaturedPost = {
  title: 'AIR DASH',
  description:
    "Digital Ally for Seamless Hours. Building Digital Airport and enhancing Customer onboarding experience and marketplace offerings across all the airports.",
    image: "http://cdn.shopify.com/s/files/1/0061/7735/7891/articles/airplanes-actuators_17389e9d-f144-4f38-8d51-f8632a63c39c_1200x1200.jpg?v=1585138977",
  imgText: 'main image description',
  linkText: 'Continue reading…'
};

const leaderBoard = [
  {
    name: 'Parmar Anand',
    // team: 'RDCA Team',
    award: 'Star of the Month',
    imageObj: 'https://image.flaticon.com/icons/png/128/4470/4470317.png'
  },
  {
    name: 'Rinku Singh',
    // team: 'BankOfTest Team',
    award: 'Star of the Month',
    imageObj: 'https://image.flaticon.com/icons/png/128/4086/4086600.png'
  },
  {
    name: 'Slesha Shinde',
    // team: 'Analysis Team',
    award: 'Star of the Month',
    imageObj: 'https://image.flaticon.com/icons/png/128/4086/4086600.png'
  },
  {
    name: 'Ramesh Koshti',
    // team: 'CCP Team',
    award: 'Star of the Month',
    imageObj: 'https://image.flaticon.com/icons/png/128/4470/4470317.png'
  },
  {
    name: 'Rani Pardesi',
    // team: 'Innovations Team',
    award: 'Maximum Efforts',
    imageObj: 'https://image.flaticon.com/icons/png/128/4086/4086600.png'
  },
  {
    name: 'Jitesh Verma',
    // team: 'HR and Ops Team',
    award: 'Maximum Efforts',
    imageObj: 'https://image.flaticon.com/icons/png/128/4470/4470317.png'
  },
  {
    name: 'Sameer Desai',
    // team: 'Accounting Team',
    award: 'Out of Box Thinker',
    imageObj: 'https://image.flaticon.com/icons/png/128/4470/4470317.png'
  },
  {
    name: 'Sakshi shetty',
    // team: 'Support and Ops Team',
    award: 'SuperHuman Award',
    imageObj: 'https://image.flaticon.com/icons/png/128/4086/4086600.png'
  }


]

const leaderBoardPts = [

  {
    name: 'Alice Dsouza',
    position: 'Mumbai',
    award: '1610pts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135789.png'
  },
  {
    name: 'Sagar Shah',
    position: 'Mumbai',
    award: '1580pts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135715.png'
  },
  {
    name: 'Preet Singh',
    position: 'Delhi',
    award: '1560pts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135715.png'
  },
  {
    name: 'Ankita Rao',
    position: 'Banglore',
    award: '1540pts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135789.png'
  },
  
  {
    name: 'Ana Dcosta',
    position: 'Mumbai',
    award: '1432pts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135789.png'
  },
  {
    name: 'Krish Mehta',
    position: 'Delhi',
    award: '1754pts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135715.png'
  },
  {
    name: 'Gayatri Deshpande',
    position: 'Mumbai',
    award: '1150ts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135789.png'
  },
  {
    name: 'Lavish Punjabi',
    position: 'Mumbai',
    award: '1150pts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135715.png'
  },
  {
    name: 'Imam Saad',
    position: 'Mumbai',
    award: '1100pts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135715.png'
  },
  {
    name: 'Bethany Rico',
    position: 'Mumbai',
    award: '1000pts',
    imageObj: 'https://image.flaticon.com/icons/png/128/3135/3135789.png'
  },
]

const dashboardStats = [
  {
    title: 'Identification',
    icon: "https://thumbs.dreamstime.com/b/education-icon-related-graduation-cap-book-pencil-vector-flat-design-education-icon-related-graduation-cap-book-163866754.jpg",
  },
  {
    title: 'Medical',
    value: '1',
    icon: "https://cdn.iconscout.com/icon/free/png-512/medical-127-129383.png",
  },
  {
    title: 'Livelihood',
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV1pc1O7_sran6bWrO8qMWBWwqFgY2Zssyjg&usqp=CAU",
  },
  {
    title: 'Diversity',
    icon: "https://www.pngitem.com/pimgs/m/285-2854834_edu-huddle-diversity-and-inclusion-icon-hd-png.png",
  }
];

export default function Home() {
  const classes = useStyles();

  React.useEffect(() => {

    notifyWelcome();
  }, []);


  const notifyWelcome = () => {
    console.log("here")
    toast.success("Desk Buddy welcomes you !");

  };

  return (
    <React.Fragment>
      <CssBaseline />

      <header className="App-header">

        <Container maxWidth="lg">
          <Header title="Adani AIR DASH" />
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Container className={classes.cardGrid} maxWidth="lg">
               {/* <Typography variant="subtitle" align="center" className={classes.divHeading}>
                  <b>👋Meet Your Accenture Donate/Fund Robo-Advisory👋</b>
                </Typography> */}
                <br/><br/>
              <Grid container spacing={3}>
                {dashboardStats.map((paper) => (
                  <Grid item key={paper.title} xs={6} sm={3}>
                    <Paper elevation={0} className={classes.paper}>
                      <Grid>
                        <img alt="icon" src={paper.icon} className={classes.icon} />
                      </Grid>
                      <Typography variant='body1' className={classes.divHeading}>
                        {paper.title}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <br/>
              <hr/>
              <br/>
              <Grid container spacing={3}>
              <Grid item xs={6} className={classes.leaderBoardParent}>
                  <Typography variant="subtitle1" align="center" className={classes.divHeading}>
                    <b>🏆LEADERBOARD - Top Points Collector🏆</b>
                  </Typography>
                  <br />
                  <List className={classes.leaderBoard}>
                    {leaderBoardPts.map(employee => (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            {(employee.imageObj) ? <img alt="icon" src={employee.imageObj} width='100%' height='100%' /> : <FaceIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={employee.name + " (" + employee.position + ") "} secondary={employee.award} />
                      </ListItem>
                    ))}

                  </List>
                </Grid>
              <Grid item xs={6} className={classes.leaderBoardParent}>
                  <Typography variant="subtitle1" align="center" className={classes.divHeading}>
                    <b>⭐️SPOTLIGHT - Stars of this month⭐️</b>
                  </Typography>
                  <br />
                  <List className={classes.leaderBoard}>
                    {leaderBoard.map(employee => (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            {(employee.imageObj) ? <img  alt="icon"src={employee.imageObj} width='100%' height='100%' /> : <FaceIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        {/* <ListItemText primary={employee.name + ' - ' + employee.team} secondary={employee.award} />/ */}
                        <ListItemText primary={employee.name} secondary={employee.award} />
                      </ListItem>
                    ))}

                  </List>
                </Grid>
                </Grid>
            </Container>

          </main>

        </Container>


        <br />
      </header>

    </React.Fragment>


  );
}