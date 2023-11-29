import { ThemeProvider, createTheme } from '@mui/material';

import { Timer } from './Timer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#06dea6'
    }
  }
});

export const App = () => (
  <ThemeProvider theme={theme}>
    <Timer/>
  </ThemeProvider>
);