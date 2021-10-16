import { StockMovement } from '../../../graphql/types';

export type CostParams = {
  in: number[],
  out: number[]
}
export const columns = ['ht', 'vat', 'discount', 'ttc'];
export const roundNumber = (n: number) => Math.round(n * 1000) / 1000;
export const lineCost = (input: StockMovement): number[] => {
  const ht = input.price * input.quantity;
  const vat = ht * (input.vat/100);
  const discount =  ht * (input.discount/100);
  return [ roundNumber(ht), roundNumber(vat), roundNumber(discount), roundNumber(ht + vat - discount) ]
}

export const linesCosts = (sales: StockMovement[], withTotal = false): number[] => {
  let quantity = 0;
  const costs = sales.reduce((sum: number[], cur: StockMovement) => {
    const out = lineCost(cur);
    quantity += cur.quantity;
    return sum.map((s, index) => s + out[index]);
  },[0, 0, 0, 0]);
  if(withTotal)costs.unshift(quantity);
  return costs;
}