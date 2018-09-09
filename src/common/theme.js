import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

// Configure Material UI theme
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light'
  }
});

export default theme;
