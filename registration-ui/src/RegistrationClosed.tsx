import { Card, CardContent, Typography } from '@material-ui/core';
import { FC } from 'react';

const RegistrationClosed: FC = () => <Card variant="outlined">
  <CardContent>
    <Typography variant="h5" component="h2" gutterBottom>Anmeldung geschlossen</Typography>
    <Typography variant="body1" gutterBottom>
      Die Anmeldung für das Boni-Arche-Camp wurde bereits geschlossen.<br />
      Vielen Dank für Ihr Interesse.
    </Typography>
  </CardContent>
</Card>

export default RegistrationClosed;
