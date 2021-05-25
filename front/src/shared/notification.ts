import { Notify } from 'quasar';

export const notify = (message: string) => {
    Notify.create({
      message: message,
      color: 'positive',
      position: 'bottom-right',
    });
}
