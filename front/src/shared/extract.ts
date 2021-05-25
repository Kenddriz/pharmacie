
export const numberFrom = (v: string): number => {
  v = v.replace( /\D+/g, '');
  return v ? Number(v) : 0;
}
