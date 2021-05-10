import './App.css';
import 'typeface-roboto';

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
  const [registeredPerson, setRegisteredPerson] = useState<any>(null);

  const onSubmitted = (formData: any) => {
    setRegisteredPerson(formData);
    setFinished(true);
  }

  const onReset = () => {
    setFinished(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>{config.title}</Typography>
        {!finished && <Information />}
        {!finished && <Form onSubmitted={onSubmitted} formData={registeredPerson} />}
        {finished && <SuccessMessage name={`${registeredPerson.firstName} ${registeredPerson.lastName}`} onReset={onReset} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
