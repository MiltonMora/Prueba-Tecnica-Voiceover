import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    flexGrow: 1,
  },
  content: {
      padding: '2% 4%',
  },
}));


const Layout = ({ children }) => {

  useEffect(()=> {
    const token = localStorage.getItem('tk');
        if (!token)
            histrory.push('/');

  },[]);


  const classes = useStyles();


  return (
    <div className={classes.root}>
        <Grid container>
          <CssBaseline />
          <Grid item xs={12}>     
            <Grid item>
              { children }
            </Grid>
          </Grid>
        </Grid>
    </div>
  );
};

export default Layout;
