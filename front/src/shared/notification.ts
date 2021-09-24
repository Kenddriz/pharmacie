import { Notify } from 'quasar';

export const notify = (message: string, color='positive') => {
    Notify.create({
      message: message,
      color,
      position: 'bottom-right',
      multiLine: true,
      html: true,
      icon: 'info'
    });
}
