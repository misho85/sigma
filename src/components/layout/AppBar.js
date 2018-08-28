import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
    textAlign: 'center'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const Appbar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <FontAwesomeIcon icon="plane-departure" />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Kalkulator
          </Typography>
          <IconButton color="inherit">
            <FontAwesomeIcon icon={['fab', 'github']} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Appbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Appbar);
