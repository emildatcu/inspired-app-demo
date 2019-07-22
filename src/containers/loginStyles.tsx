import { createStyles, Theme } from '@material-ui/core/styles';

const useStyles = (theme: Theme) => createStyles({
  button: {
    maxHeight: '36px',
  },
  form: {
    marginBottom: theme.spacing(1),
  },
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

export default useStyles;
