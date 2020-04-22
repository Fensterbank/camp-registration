import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import config from './config.json';
import moment  from 'moment';

interface Contact {
  type: string;
  label: string;
  value: string;
}

const Information: FC = () => {
  const renderContact = (contact: Contact) => {
    switch (contact.type) {
      case 'phone':
        return <>
          <Grid item xs={12} md={6}><Typography variant="body2">{contact.label}</Typography></Grid>
          <Grid item xs={12} md={6}><Typography variant="body2" gutterBottom>{contact.value}</Typography></Grid>
        </>;
      case 'mail':
        return <>
          <Grid item xs={12} md={6}><Typography variant="body2">{contact.label}</Typography></Grid>
          <Grid item xs={12} md={6}><Typography variant="body2" gutterBottom><a href={`mailto:${contact.value}`}>{contact.value}</a></Typography></Grid>
        </>;
    }
  }

  return <Card variant="outlined">
    <CardContent>
      <Typography variant="body1"><div dangerouslySetInnerHTML={{ __html: config.information }} /></Typography>
      <Typography variant="body1">
        <ul>
          {config.facts.map(fact => <li>{fact}</li>)}
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
        <Typography variant="body2" gutterBottom>{moment(config.begin).format('LL')} bis {moment(config.end).format('LL')}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
        <Typography variant="subtitle2">Packtag:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
        <Typography variant="body2" gutterBottom>{moment(config.packday).format('LL')}</Typography>
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
          {config.pricing.lines.map(line => <Typography variant="body2">{line}<br /></Typography>)}
          {config.pricing.suffix && <Typography variant="caption" component="p" className="mg-bottom"><br />{config.pricing.suffix}</Typography>}
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
    </CardContent>
  </Card>
}

export default Information;
