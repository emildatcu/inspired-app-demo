import { lightGreen } from '@material-ui/core/colors';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  app: {
    textAlign: 'center',
  },
  appHeader: {
    alignItems: 'center',
    backgroundColor: '#282c34',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'calc(10px + 2vmin)',
    justifyContent: 'center',
    minHeight: '20vh',
  },
  appLink: {
    color: '#61dafb',
    display: 'inline-flex',
  },
  appLogo: {
    animation: '$App-logo-slide infinite 3s linear',
    height: '10vmin',
    pointerEvents: 'none',
  },
  '@keyframes App-logo-slide': {
    '0%': { transform: 'translate(-230px, 0)' },
    '50%': { transform: 'translate(0, 0)' },
    '100%': { transform: 'translate(0, -150px)' },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  end: {
    alignContent: 'flex-end',
  },
  logo: {
    maxHeight: '70px',
    padding: '8px 0',
  },
  root: {
    flexGrow: 1,
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

// .App {
//   text-align: center;
// }

// .App-logo {
//   animation: App-logo-spin infinite 20s linear;
//   height: 10vmin;
//   pointer-events: none;
// }

// .App-header {
//   background-color: #282c34;
//   min-height: 20vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   font-size: calc(10px + 2vmin);
//   color: white;
// }

// .App-link {
//   color: #61dafb;
//   display: 'inline-flex';
// }

// @keyframes App-logo-spin {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }
