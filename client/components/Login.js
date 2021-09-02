import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NameEntry from './NameEntry';
import Languages from './Languages';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import socket from '../socket';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export default function Login(props) {
  const language = useSelector((state) => state.language);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    dispatch({ type: 'WRITE_AUTHOR', name });
    socket.emit('join', { name, language }, (error) => {
      if (error) {
        alert(error);
      }
    });
    props.history.push('/channels/1');
  };

  return (
    <div className={classes.root}>
      <NameEntry handleChange={handleChange} />
      <Languages />
      <Button variant="outlined" color="primary" onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
}
