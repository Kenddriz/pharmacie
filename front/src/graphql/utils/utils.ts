import { Dialog } from 'quasar';

export const cloneDeep = (data: any) => {
  return JSON.parse(JSON.stringify(data))
}
 export const softRemoveDialog = (callbackFn: () => void) => {
   const dialog = Dialog.create({
     title: '<strong>Etes-vous sûr de supprimer cet élément ?</strong>',
     message: 'Si vous le supprimer, vous pouvez toujours<br> le récupérer dans la corbeille.',
     html: true,
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
