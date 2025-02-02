import { Alert, AlertTitle } from '@material-ui/lab';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import { endOfDay, isAfter, parseISO } from 'date-fns';

import config from './config.json';
import { format } from 'date-fns';

interface Contact {
  type: string;
  label: string;
  value: string;
}

const Information: FC = () => {
  const registrationEnd = config.registrationEnd ? endOfDay(parseISO(config.registrationEnd)) : null

  const renderContact = (contact: Contact) => {
    switch (contact.type) {
      case 'phone':
        return <Fragment key={contact.label}>
          <Grid item xs={12} md={6}><Typography variant="body2">{contact.label}</Typography></Grid>
          <Grid item xs={12} md={6}><Typography variant="body2" gutterBottom>{contact.value}</Typography></Grid>
        </Fragment>;
      case 'mail':
        return <Fragment key={contact.label}>
          <Grid item xs={12} md={6}><Typography variant="body2">{contact.label}</Typography></Grid>
          <Grid item xs={12} md={6}><Typography variant="body2" gutterBottom><a href={`mailto:${contact.value}`}>{contact.value}</a></Typography></Grid>
        </Fragment>;
    }
  }

  return <Card variant="outlined">
    <CardContent>
      <Typography variant="body1"><div dangerouslySetInnerHTML={{ __html: config.information }} /></Typography>
      <Typography variant="body1">
        <ul>
          {config.facts.map(fact => <li key={fact}>{fact}</li>)}
        </ul>
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Teilnehmer:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body2" gutterBottom>{config.participants}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Zeitraum:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body2" gutterBottom>{format(new Date(config.begin), 'PP')} bis {format(new Date(config.end), 'PP')}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Ort:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body2" gutterBottom>{config.location}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Teilnehmerbeitrag:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          {config.pricing.lines.map(line => <Typography key={line} variant="body2">{line}<br /></Typography>)}
          {config.pricing.suffix && <Typography variant="caption" component="p" className="mg-bottom"><br />{config.pricing.suffix}</Typography>}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Bezahlung:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body2" gutterBottom>
            <b>{config.payment.name}</b><br />
            IBAN: {config.payment.iban}<br />
            Betreff: "Anmeldung mit Name des Kindes"
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2">Kontakt:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container>
            {config.contacts.map((c: Contact) => renderContact(c))}
          </Grid>
        </Grid>
      </Grid>
      {config.alert && !(registrationEnd && isAfter(new Date(), registrationEnd)) && <Alert severity="warning">
        <AlertTitle>{(config.alert as any).title}</AlertTitle>
        <div dangerouslySetInnerHTML={{ __html: (config.alert as any).text }} />
      </Alert>}
    </CardContent>
  </Card>
}

export default Information;
