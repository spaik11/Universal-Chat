import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Navbar(props) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: 'WRITE_AUTHOR', name: '' });
    props.history.push('/');
    location.reload();
  };

  return (
    <nav>
      <h3>Hello!</h3>
      <div className={classes.root}>
        <Button variant="outlined" color="secondary" onClick={handleClick}>
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
