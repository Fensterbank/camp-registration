import './App.css';
import 'typeface-roboto';
import 'moment/locale/de';

import { Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import Form from './Form';
import Information from './Information';
import SuccessMessage from './SuccessMessage';
import { ThemeProvider } from '@material-ui/styles';
import config from './config.json';
import { createMuiTheme } from '@material-ui/core/styles';
import { deDE } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: config.theme.primary,
    },
    secondary: {
      main: config.theme.secondary,
    },
  },
}, deDE);

function App() {
  const [finished, setFinished] = useState(false);

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>{config.title}</Typography>
      {!finished && <Information />}
      {!finished && <Form onSubmitted={() => setFinished(true)} />}
      {finished && <SuccessMessage onReset={() => setFinished(false)} />}
    </Container>
    </ThemeProvider>
  );
}

export default App;
