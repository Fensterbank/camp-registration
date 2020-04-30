import React from 'react';
import { Typography } from '@material-ui/core';

const Privacy = () => {
  return <>
    <Typography variant="h6">Informationen zur Datenverarbeitung:</Typography>
    <Typography variant="body1">
      Die von Ihnen getätigten Angaben werden über eine verschlüsselte Verbindung auf einen von uns betriebenen Server übertragen und dort gespeichert.<br />
      Der Server, auf dem die Daten gespeichert werden, befindet sich in einem sicheren Rechenzentrum in Nürnberg.
    </Typography>
    <Typography variant="body1">
      Für unsere Verwaltungsprozesse und die Durchführung des Zeltlagers ist es unvermeidlich, dass die elektronisch vorliegenden Teilnehmerdaten vor Beginn des Zeltlagers exportiert und in unverschlüsselter und ausgedruckter Form vorliegen.<br />
      Dieses Anmeldeformular ermöglicht Ihnen also das und bequeme Anmelden von Teilnehmerinnen und Teilnehmer, es verändert aber nicht die weiteren üblichen Prozesse.
    </Typography>
    <Typography variant="body1">
      Weiterführende Informationen finden Sie in unserer <a href="https://boni-arche-camp.de/datenschutz" rel="noopener noreferrer" target="_blank">Datenschutzerklärung</a>.
    </Typography>
  </>
}

export default Privacy;
