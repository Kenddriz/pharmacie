import { Dialog } from 'quasar';
import { i18n } from '../../boot/i18n';
import { Unit } from '../types';

export const cloneDeep = (data: any) => {
  return JSON.parse(JSON.stringify(data))
}

export const removeDialog = (callbackFn: () => void, msg = 'softRemove') => {
  const dialog = Dialog.create({
    title: i18n.global.tm('remove.title') + '',
    message: i18n.global.tm('remove.' + msg) + '',
    html: true,
    persistent: true,
    ok: {
       rounded: true,
       unelevated: true,
       label: 'Garder',
       color: 'amber',
       noCaps: true
     },
    cancel: {
     flat: true,
     color: 'red',
     label: 'Supprimer',
     noCaps: true
   },
 }).onCancel( () => { callbackFn(); dialog.hide(); })
}
export function convertValue (
  value: number,
  curIndex: number,
  newIndex: number,
  units: Unit[],
  isQ: boolean
): number {
  const proportion = units[newIndex].multiplicity / units[curIndex].multiplicity;
  return isQ ? value * proportion : value / proportion;
}
export const validateDate = (val: string):boolean => {
  return val.split('/').length === 3;
}
