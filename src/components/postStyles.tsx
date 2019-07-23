import { makeStyles } from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';

const styles = makeStyles({
  avatar: {
    backgroundColor: lightGreen[500],
  },
  card: {
    maxWidth: 620,
  },
  media: {
    minWidth: 440,
    width: '100%',
  },
  mediaContainer: {
    textAlign: 'center',
  },
  spacing: {
    justifyContent: 'space-between',
  },
});

export default styles;
