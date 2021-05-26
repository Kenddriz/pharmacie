import { date } from 'quasar';
// destructuring to keep only what is needed
const {isValid, formatDate: formatD } = date;
export const formatDate = (val: string | number, format: any) =>{
    if(typeof val === 'number')
      return formatD(val, format);
    return (isValid(val) ? formatD(val, format) : val)
}
