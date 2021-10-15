import { date } from 'quasar';
// destructuring to keep only what is needed
const DATE_FORMATS = {
  DATE_TIME: 'DD-MM-YYYY à HH:mm:ss',
  DATE_ONLY: 'DD/MM/YYYY',
  TIME_ONLY: 'HH:mm:ss'
};
type DateFormat = 'DATE_TIME'|'DATE_ONLY'|'TIME_ONLY';

const {isValid, formatDate: formatD } = date;

export const formatDate = (val: string | number, key: DateFormat) =>{
    if(typeof val === 'number')
      return formatD(val, DATE_FORMATS[key]);
    return (isValid(val) ? formatD(val, DATE_FORMATS[key]) : val);
}
