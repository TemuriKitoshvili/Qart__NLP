import { useState } from 'react';
import '../../scss/Material-UI/PopoverModule.scss';

// Material UI
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function PopoverModule({ word, setLemWordData }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        className='PopoverModuleWord'
        style={{ textDecorationColor: `${word.color}` }}
        aria-haspopup='true'
        onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
        onMouseLeave={() => setAnchorEl(null)}
        onClick={() => setLemWordData(word)}
      >
        {word.word}
      </Typography>
      <Popover
        id='mouse-over-popover'
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
      >
        <Typography className='popup__modal'>
          <span>სიტყვა: {word.word} </span>
          <span>ლემა: {word.lem} </span>
          <span>მორფოლოგია: {word.tags.map((tag) => `${tag}. `)} </span>
        </Typography>
      </Popover>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: '50%',
    marginTop: '-10px',
    boxShadow:
      '-2px -2px 5px rgba(255, 255, 255, 1), 2px 2px 5px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default PopoverModule;
