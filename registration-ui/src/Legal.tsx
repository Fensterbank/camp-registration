import * as Yup from 'yup';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { FC, useCallback, useEffect } from 'react';

import { useFormik } from 'formik';

interface LegalProps {
  onAcceptedChange: (accepted: boolean) => void;
}

const Legal: FC<LegalProps> = ({ onAcceptedChange }) => {
  const handleChange = useCallback(onAcceptedChange, []);

  const formik = useFormik({
    initialValues: {
      acc1: false,
      acc2: false,
      acc3: false,
      acc4: false,
    },
    isInitialValid: false,
    validationSchema: Yup.object({
      acc1: Yup.boolean().oneOf([true], 'Muss akzeptiert werden'),
      acc2: Yup.boolean().oneOf([true], 'Muss akzeptiert werden'),
      acc3: Yup.boolean().oneOf([true], 'Muss akzeptiert werden'),
      acc4: Yup.boolean().oneOf([true], 'Muss akzeptiert werden'),
    }),
    onSubmit: () => { }
  });

  useEffect(() => {
    handleChange(formik.isValid);
  }, [formik.isValid, handleChange]);

  return (
    <div className="legal">
      <p>
        Als Erziehungsberechtigte geben wir die Erlaubnis,
        dass unser Sohn / unsere Tochter
      </p>
      <ul>
        <li>
          an allen Veranstaltungen während der Freizeit, wie Schwimmen (in Seen oder 	Bädern), Ausflüge, Wanderungen, Nachtwachen, etc. teilnehmen darf.<br />
          Diese Veranstaltungen stehen soweit notwendig unter der Aufsicht von 	Gruppenleitern.
        </li>
        <li>
          zusammen mit anderen Jungen bzw. Mädchen und dem Zeltbetreuer bzw. der 	Zeltbetreuerin in einem Zelt wohnen darf.
        </li>
        <li>
          in Fahrzeugen, die durch einen Betreuer gesteuert werden, mitfahren darf.
        </li>
        <li>
          von einem Arzt behandelt werden darf und notwendige ärztliche Eingriffe durchgeführt werden dürfen.
        </li>
        <li>
          in Gruppen von mind. 2 Personen auch selbstständig unterwegs sein darf.
        </li>
      </ul>
      <FormControlLabel
        control={<Checkbox
          id="acc1"
          checked={formik.values.acc1}
          onChange={formik.handleChange}
          color="primary"
        />}
        label="Wir nehmen zur Kenntnis, dass die Freizeitleitung nicht für abhanden gekommene Gegenstände, sowie für Folgen von selbstständigen Unternehmungen der Kinder und Jugendlichen, die nicht von der Leitung des Zeltlagers angesetzt sind, haftet."
      />
      <p>
        <FormControlLabel
          control={<Checkbox
            id="acc2"
            checked={formik.values.acc2}
            onChange={formik.handleChange}
            color="primary"
          />}
          label="Wir weisen darauf hin, dass Teilnehmer, die sich nachhaltig den Anweisungen des Zeltlagerteams widersetzen, durch die Zeltlagerleitung auf Kosten der Eltern nach Hause geschickt werden können."
        />
      </p>
      <p>
        <FormControlLabel
          control={<Checkbox
            id="acc3"
            checked={formik.values.acc3}
            onChange={formik.handleChange}
            color="primary"
          />}
          label={<>Da das Zeltlager in freier Natur stattfindet, kann es zu Zeckenbissen kommen.<br />
        Ich bin damit einverstanden, dass meiner Tochter / meinem Sohn diese schnellstmöglich von erfahrenen Betreuern entfernt werden.</>}
        />
      </p>
      <p>
        <FormControlLabel
          control={<Checkbox
            id="acc4"
            checked={formik.values.acc4}
            onChange={formik.handleChange}
            color="primary"
          />}
          label="Fotos und Videos, auf denen unser Sohn / unsere Tochter zu sehen ist, dürfen in der Zeltlagerzeitung, auf unserer offiziellen Internetseite, Facebook, Instagram, Twitter und im Zeltlagerfilm auf YouTube veröffentlicht werden."
        />
      </p>
    </div>
  )
}
export default Legal;