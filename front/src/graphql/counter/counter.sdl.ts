import { gql } from '@apollo/client/core';

export class CounterData {
  countForms = 0;
  countDosages = 0;
  countArticles = 0;
  countMedicines = 0;
  countProviders = 0;
  countUndeliveredCommands = 0;
  countUnpaidInvoices = 0;
}

export const COUNTER = gql`
    query Count {
      countForms,
      countDosages,
      countArticles,
      countMedicines,
      countProviders,
      countUndeliveredCommands,
      countUnpaidInvoices
    }
`;
