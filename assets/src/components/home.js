import  React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';

import { getUsers, getRoles, setRoles } from '../actions/UserActions';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const modalStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    position: 'relative',
  },
  table: {
    minWidth: 650,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function Home() {
    const classes = useStyles();
    const modalClasses = modalStyles();

    const [values, setValues] = React.useState({
      loading: true,
      data: [],
      error: false,
      open: false,
      modalLoading: false,
      dataRol: [],
      userRol: [],
      userId: 0,
    });

    useEffect(()=> {
      init()
  },[]);

    const [modalStyle] = React.useState(getModalStyle);

    const init = () => {
      getUsers()
      .then(res => {
        setValues({...values, loading: false, data: res.data.data, error: false, open: false})
      })
      .catch(err => {
          setValues({...values, loading: false, data: [], error: true });
          console.log(err)
      })
    }

    const handleClick = (rol, userId) => {
      handleOpen()
      setValues({...values, modalLoading: true })
      getRoles()
      .then(res => {
        setValues({...values, open: true, dataRol: res.data.data, userRol: rol,  modalLoading: false, userId: userId })
      })
      .catch(err => {
        console.log(err)
      })

    }

    const handleOpen = () => {
      setValues({...values, open: true })
    };
  
    const handleClose = () => {
      setValues({...values, open: false })
    };

    const handleChange = (rol) => {
      const index = values.userRol.indexOf(rol)
      let usrol
      if(index != -1) {
        usrol = values.userRol;
        usrol.splice(index, 1);
      }
      else {
        usrol = [
          ...values.userRol,
          rol
        ];
      }
      
      setValues({...values, userRol: usrol })
    }

    const handleSave = () => {
        const data = {
          "userId": values.userId,
          "roles": values.userRol
        };
        setRoles(data)
        .then(res => {
          if(res.data.status != 200) {
              console.log(err.data)  
          }
          init()
        })
        .catch(err => {
          console.log(err)
        })
        handleClose()

    }

  return (
    <div className={classes.root}>
      <div>
        {values.modalLoading ? 
          <CircularProgress /> :
          <Modal
            open={values.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={modalClasses.paper}>
              <h2 id="simple-modal-title">Editar Roles</h2>
              <p id="simple-modal-description"> </p>
              <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.dataRol.map((rowRol) => (
                    <TableRow key={rowRol.id}>
                      <TableCell component="th" scope="row">
                        {rowRol.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                      <Checkbox
                          checked={values.userRol.indexOf(rowRol.name) != -1}
                          onChange={() => handleChange(rowRol.name)}
                          name="checkedB"
                          color="primary"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outlined" color="primary" onClick={handleSave}>Save</Button>
            </TableContainer>
            </div>
          </Modal>
        }
      </div>
      {values.loading ? 
          <CircularProgress /> :
        <div style={{ height: 400, width: '100%' }}>
          {values.error ?
              <Alert severity="error">Usuario no autorizado!</Alert>
          :  <TableContainer>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell align="left">email</TableCell>
                    <TableCell align="left">rol</TableCell>
                    <TableCell align="left">edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.rol.toString()}</TableCell>
                      <TableCell align="left"><Button onClick={() => handleClick(row.rol, row.id)}>Edit Roles</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </div>
      }
    </div>
  );
}