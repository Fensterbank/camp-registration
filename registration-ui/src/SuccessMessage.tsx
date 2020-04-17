import { Card, CardContent, Typography } from '@material-ui/core';

import React from 'react';

const SuccessMessage = () => {
  return <Card variant="outlined">
    <CardContent>
    <Typography variant="h5" component="h2" gutterBottom>Anmeldung gespeichert</Typography>
    <Typography variant="body1">Ihre Anmeldung wurde gespeichert. Sie können das Fenster jetzt schließen, oder ein weiteres Kind mit den selben Adressdaten anmelden.</Typography>
    </CardContent>
  </Card>
}

export default SuccessMessage;
