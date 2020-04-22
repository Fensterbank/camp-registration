import { Button, Card, CardContent, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import config from './config.json';

interface SuccessMessageProps {
  name: string;
  onReset: () => void;
}

const SuccessMessage: FC<SuccessMessageProps> = ({ name, onReset }) => {
  return <Card variant="outlined">
    <CardContent>
    <Typography variant="h5" component="h2" gutterBottom>Anmeldung gespeichert</Typography>
    <Typography variant="body1">Ihre Anmeldung wurde gespeichert.</Typography>
    <Typography variant="body1" gutterBottom>Bitte überweisen Sie den fälligen Betrag unter Angabe des Betreffs »Anmeldung {name}« an folgendes Konto:</Typography>
    <Typography variant="body1" gutterBottom>
       <b>{config.payment.name}</b><br />
       IBAN: {config.payment.iban}
    </Typography>
    <Typography gutterBottom>
      Sie können das Fenster jetzt schließen oder ein weiteres Kind mit gleichen Adressdaten anmelden.
    </Typography>
    <Button onClick={onReset} variant="contained" color="primary" fullWidth>Weiteres Kind anmelden</Button>
    </CardContent>
  </Card>
}

export default SuccessMessage;
