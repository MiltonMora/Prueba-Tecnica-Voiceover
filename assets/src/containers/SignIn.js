import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import ButtonIcon from '@material-ui/icons/AssignmentInd';
import { useHistory } from 'react-router-dom';

import { Login } from '../actions/UserActions';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://iyoud.org/wp-content/uploads/2021/03/coffee.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main,
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  alert: {
      
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    textAlign: 'center',
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const histrory = useHistory();

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    email: '',
    error_email: false,
    error_password: false,
    open: false,
    loading: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      setValues({...values, loading: true})
      const data = {
        "email": values.email,
        "password": values.password
      };
      Login(data)
      .then(res => {
        setValues({...values, loading: false})
        if(res.data.status != 200) {
           setValues({...values, error_email: true, open: true, error_password: true});
        }
        else {
          localStorage.setItem('tk', res.data.data);
          histrory.push('/home');
        }
      })
      .catch(err => {
        setValues({...values, error_email: true, open: true, loading: false, error_password: true});
      });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
      }
    setValues({...values, open: false});
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Ingreso
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange('email')}
              value={values.email}
              error={values.error_email ? true : false}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              id="password"
              autoComplete="current-password"
              error={values.error_password ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.wrapper}>
              <Button
                disabled={values.loading}
                type="submit"
                size="large"
                variant="outlined"
                color={values.loading ? "inherit" :"secondary"}
                className={classes.submit}
                onClick={handleSubmit}
                startIcon={<ButtonIcon />}>
                Ingresar
              </Button>
              {values.loading ? <CircularProgress size={24} className={classes.buttonProgress} />: ''}
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                autoHideDuration={6000}
                open={values.open}
                onClose={handleClose}
                action={
                    <React.Fragment>
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
                className={classes.alert}>
                <Alert onClose={handleClose} severity="error">
                Error con los datos de ingreso, intenta de nuevo
                </Alert>
            </Snackbar>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}