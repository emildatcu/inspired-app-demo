import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  container: {
    margin: '0 -8px -8px',
  },
  spacing: {
    justifyContent: 'space-between',
  },
  subtitle: {
    padding: theme.spacing(2),
  },
});

export default styles;
