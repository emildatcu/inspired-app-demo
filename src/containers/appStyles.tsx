import { lightGreen } from '@material-ui/core/colors';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  center: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  end: {
    alignContent: 'flex-end',
  },
  link: {
    color: 'white',
    marginRight: '15px',
  },
  logo: {
    maxHeight: '70px',
    padding: '8px 0',
  },
  navBar: {
    display: 'flex',
  },
  title: {
    padding: '8px',
  },
  titleContainer: {
    justifyContent: 'space-between',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: {
      main: '#7c4dff',
    },
  },
});

export { theme };

export default useStyles;
