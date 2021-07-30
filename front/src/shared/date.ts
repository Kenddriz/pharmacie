import { date } from 'quasar';
// destructuring to keep only what is needed
const DATE_FORMATS = {
  DATE_TIME: 'DD-MM-YYYY T HH:mm:ss',
  DATE_ONLY: 'DD/MM/YYYY',
  TIME_ONLY: 'HH:mm:ss',
  DB_DATE: 'YYYY-MM-DD'
};
type DateFormat = 'DATE_TIME'|'DATE_ONLY'|'TIME_ONLY'|'DB_DATE';

const {isValid,extractDate, formatDate: formatD } = date;

export const formatDate = (val: string | number, key: DateFormat) =>{
    if(typeof val === 'number')
      return formatD(val, DATE_FORMATS[key]);
    return (isValid(val) ? formatD(val, DATE_FORMATS[key]) : formatD(extractDate(val, 'DATE_ONLY'), DATE_FORMATS[key]));
}
