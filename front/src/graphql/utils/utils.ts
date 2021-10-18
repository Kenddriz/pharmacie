import { Dialog } from 'quasar';
import { i18n } from '../../boot/i18n';
import { Command, Contact, Medicine, SaleLineInput, StockMovement, Unit } from '../types';
import moment from 'moment';
import { jsPDF }  from 'jspdf';
import autoTable from 'jspdf-autotable';
import { computed, ref } from 'vue';
import { roundNumber } from '../../components/dashboard/income/logical';

export const cloneDeep = (data: any) => {
  return JSON.parse(JSON.stringify(data))
}

export const removeDialog = (callbackFn: () => void, msg:'softRemove'|'removeForever' = 'softRemove') => {
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
export const getMedicineName = (med: Medicine): string => {
  return `${med.article.commercialName} ${med.dosage.label}, ${med.form.label}`;
}
export const getOneContact = (contacts: Contact[], each = false) => {
  const list: string[] = [];
  for(const contact of contacts) {
    if(each && list.length)break;
    else if(contact.list.length)list.push(contact.list[0])
  }
  return list.length ? list.join(' - ') : 'aucun contact';
}
export const leftDays = (exp: number|string) => {
  return moment(exp).diff(Date.now(), 'days') + 1;
}
export const subdivideToUnits = (val: number, units: Unit[]): number[] => {
  const size = units.length;
  const subdivided = Array(units.length).fill(0);
  let remain = val;
  const divisor = units[size - 1].multiplicity;
  units.forEach((unit, index) => {
    const q = remain * unit.multiplicity;
    subdivided[index] = Math.floor( q / divisor);
    remain = q%divisor;
  });
  return subdivided;
}
export const saleLineCost = (input: SaleLineInput|StockMovement): number => {
  let c = input.price * input.quantity;
  c += (c * (input.vat / 100)) - (c * (input.discount/100));
  return roundNumber(c);
}
export const downloadPdf = (command: Command) => {
  const columns: string[]  = ['N°', 'Médicament', 'Quantité']
  const rows:string[][] = [];
  command.commandLines?.forEach((line, iLine) => {
    const row:string[] = [];
    row.push(String(iLine + 1));
    row.push(getMedicineName(line.medicine));
    const units = line.medicine.packaging.units;
    const values = subdivideToUnits(line.quantity, units);
    const quantities: string[] = []
    units.forEach((u, index) => {
      if(values[index] > 0)quantities.push(values[index] + ' ' + u.label);
    });
    row.push(quantities.join(' - '));
    rows.push(row);
  });
  const doc = new jsPDF('p', 'pt');
  doc.text('Commande', 45, 30);
  autoTable(doc, {
    head: [columns],
    body: rows,
    theme: 'grid',//'striped', 'grid' or 'plain',
    didParseCell: function (table: any) {
      if (table.section === 'head')
        table.cell.styles.fillColor = '#044973';
      table.cell.styles.halign = 'center';
    }
  });
  doc.save(command.provider.name + '.pdf');
}
export const movable = (callBack: any = undefined) => {
  const pos = ref([0, 0]);
  function move (ev: any) {
    if(callBack)callBack(ev);
    pos.value = [pos.value[0] + ev.delta.x, pos.value[1] + ev.delta.y];
  }
  const currentPos = computed(() => `transform:translate(${pos.value[0]}px,${pos.value[1]}px`);
  return { currentPos, move }
}
