import { SaleLineInput, StockMovement } from '../../../graphql/types';

export const columns = ['ht', 'vat', 'discount', 'ttc'];
export const roundNumber = (n: number) => Math.round(n * 1000) / 1000;
export const lineCost = (input: StockMovement|SaleLineInput, round = true): number[] => {
  const ht = input.price * input.quantity;
  const vat = ht * (input.vat/100);
  const discount =  ht * (input.discount/100);
  if (round) return [
    roundNumber(ht),
    roundNumber(vat),
    roundNumber(discount),
    roundNumber(ht + vat - discount)
  ];
  return [ ht, vat, discount, ht + vat - discount ];
}
/**any: stockMovement, saleLineInput**/
export const linesCosts = (sales: any[], withTotal = false): number[] => {
  let quantity = 0;
  const costs = sales.reduce((sum: number[], cur: StockMovement) => {
    const out = lineCost(cur, false);
    quantity += cur.quantity;
    return sum.map((s, index) => roundNumber(s + out[index]));
  },[0, 0, 0, 0]);
  if(withTotal)costs.unshift(quantity);
  return costs;
}
