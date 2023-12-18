import { DemiAlertItem } from 'demiurge';

export enum AlertEnum {
  Login,
  InvalidForm,
  EmailNotMatch,
  PassNotMatch,
  CanNotCreateAccount,
}

export const ALERT_CONFIG: DemiAlertItem[] = [
  {
    title: 'ERROR',
    message:
      'The supplied auth credential is incorrect, malformed or has expired. ',
    buttons: [{ label: 'OK' }],
  },
  {
    title: 'ERROR',
    message: 'Invalid form! ',
    buttons: [{ label: 'ok' }],
  },
  {
    title: 'ERROR',
    message: 'Email not match! ',
    buttons: [{ label: 'ok' }],
  },
  {
    title: 'ERROR',
    message: 'Password not match! ',
    buttons: [{ label: 'ok' }],
  },
  {
    title: 'ERROR',
    message: 'An error occurs. Try again later',
    buttons: [{ label: 'ok' }],
  },
];

export const getAlertConfig = (alert: AlertEnum): DemiAlertItem => {
  return ALERT_CONFIG[alert];
};
