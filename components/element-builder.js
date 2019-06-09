import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    position: 'absolute',
    height: 400,
    width: 400,
    backgroundColor: 'white',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

export const ElementBuilder = React.memo(({ classes, onClose, onSubmit }) => {

  return (
    <div className={classes.root} tabIndex={1}>
      Hello!!!!
    </div>
  );
});

export default withStyles(styles)(ElementBuilder);