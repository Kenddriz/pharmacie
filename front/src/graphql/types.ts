export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Command = {
  __typename?: 'Command';
  id: Scalars['Int'];
  provider: Provider;
  vat: Scalars['Float'];
  arrived: Scalars['Boolean'];
};

export type CommandLine = {
  __typename?: 'CommandLine';
  id: Scalars['Int'];
  unit: Unit;
  medicine: Medicine;
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['Int'];
  label: Scalars['String'];
};

export type ContactType = {
  __typename?: 'ContactType';
  id: Scalars['Int'];
  label: Scalars['String'];
  contacts: Array<Contact>;
};

export type CreateCommandLineInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateContactInput = {
  contactTypeId: Scalars['Float'];
  contacts: Array<Scalars['String']>;
};

export type CreateContactTypeInput = {
  label: Scalars['String'];
};

export type CreateInvoiceInput = {
  dueDate: Scalars['String'];
  reference: Scalars['String'];
};

export type CreateMedicineInput = {
  designation: Scalars['String'];
  expiration: Scalars['String'];
  vat: Scalars['Float'];
  type: Scalars['String'];
  quantities: Array<CreateQuantityInput>;
};

export type CreateMedicineTypeInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreatePaymentInput = {
  reference: Scalars['Float'];
  description: Scalars['String'];
  date: Scalars['String'];
  invoiceId: Scalars['Float'];
  paymentMode: Scalars['String'];
};

export type CreateProviderInput = {
  name: Scalars['String'];
  contactTypes: Array<CreateContactInput>;
};

export type CreateQuantityInput = {
  unitId: Scalars['Int'];
  value: Scalars['Int'];
  price: Scalars['Int'];
};

export type CreateSaleInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateSalesLineInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateUnitInput = {
  label: Scalars['String'];
  description: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type Invoice = {
  __typename?: 'Invoice';
  id: Scalars['Int'];
  reference: Scalars['String'];
  dueDate: Scalars['String'];
  payment?: Maybe<Payment>;
  command?: Maybe<Command>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type LoginDto = {
  __typename?: 'LoginDto';
  token: Scalars['String'];
};

export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['Int'];
  designation: Scalars['String'];
  expiration: Scalars['String'];
  vat: Scalars['Float'];
  type: MedicineType;
  quantities: Array<Quantity>;
};

export type MedicineType = {
  __typename?: 'MedicineType';
  id: Scalars['Int'];
  label: Scalars['Float'];
};

export type Meta = {
  __typename?: 'Meta';
  itemCount: Scalars['Float'];
  totalItems: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalPages: Scalars['Float'];
  currentPage: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSalesLine: SalesLine;
  updateSalesLine: SalesLine;
  removeSalesLine: SalesLine;
  createSale: Sale;
  updateSale: Sale;
  removeSale: Sale;
  createMedicineType: MedicineType;
  updateMedicineType: MedicineType;
  removeMedicineType: MedicineType;
  createInvoice: Invoice;
  updateInvoice: Invoice;
  createCommand: Command;
  updateCommand: Command;
  removeCommand: Command;
  createProvider: Provider;
  createContactType: ContactType;
  updateContactType: ContactType;
  createPayment: Invoice;
  updatePaymentMode: PaymentMode;
  createMedicine: Medicine;
  createUser: User;
  updateUser: User;
  login: LoginDto;
  createUnit: Unit;
  updateUnit: Unit;
  createCommandLine: CommandLine;
  updateCommandLine: CommandLine;
  removeCommandLine: CommandLine;
};


export type MutationCreateSalesLineArgs = {
  createSalesLineInput: CreateSalesLineInput;
};


export type MutationUpdateSalesLineArgs = {
  updateSalesLineInput: UpdateSalesLineInput;
};


export type MutationRemoveSalesLineArgs = {
  id: Scalars['Int'];
};


export type MutationCreateSaleArgs = {
  createSaleInput: CreateSaleInput;
};


export type MutationUpdateSaleArgs = {
  updateSaleInput: UpdateSaleInput;
};


export type MutationRemoveSaleArgs = {
  id: Scalars['Int'];
};


export type MutationCreateMedicineTypeArgs = {
  createMedicineTypeInput: CreateMedicineTypeInput;
};


export type MutationUpdateMedicineTypeArgs = {
  updateMedicineTypeInput: UpdateMedicineTypeInput;
};


export type MutationRemoveMedicineTypeArgs = {
  id: Scalars['Int'];
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};


export type MutationCreateCommandArgs = {
  createCommandInput: PurchaseInput;
};


export type MutationUpdateCommandArgs = {
  updateCommandInput: PurchaseDto;
};


export type MutationRemoveCommandArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProviderArgs = {
  input: CreateProviderInput;
};


export type MutationCreateContactTypeArgs = {
  input: CreateContactTypeInput;
};


export type MutationUpdateContactTypeArgs = {
  input: UpdateContactTypeInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationUpdatePaymentModeArgs = {
  input: UpdatePaymentModeInput;
};


export type MutationCreateMedicineArgs = {
  input: CreateMedicineInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationLoginArgs = {
  input: AuthInput;
};


export type MutationCreateUnitArgs = {
  input: CreateUnitInput;
};


export type MutationUpdateUnitArgs = {
  input: UpdateUnitInput;
};


export type MutationCreateCommandLineArgs = {
  createCommandLineInput: CreateCommandLineInput;
};


export type MutationUpdateCommandLineArgs = {
  updateCommandLineInput: UpdateCommandLineInput;
};


export type MutationRemoveCommandLineArgs = {
  id: Scalars['Int'];
};

export type PaginationInput = {
  keyword: Scalars['String'];
  page: Scalars['Float'];
  limit: Scalars['Float'];
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['Int'];
  reference: Scalars['String'];
  description: Scalars['String'];
  date: Scalars['String'];
  paymentMode: PaymentMode;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PaymentMode = {
  __typename?: 'PaymentMode';
  id: Scalars['Int'];
  label: Scalars['String'];
};

export type Provider = {
  __typename?: 'Provider';
  id: Scalars['Int'];
  name: Scalars['String'];
  logo: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  contactTypes: Array<ContactType>;
};

export type ProviderPagination = {
  __typename?: 'ProviderPagination';
  items: Array<Provider>;
  meta: Meta;
};

export type PurchaseDto = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type PurchaseInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type Quantity = {
  __typename?: 'Quantity';
  id: Scalars['Int'];
  medicine: Medicine;
  stock: Scalars['Float'];
  shop: Scalars['Float'];
  price: Scalars['Float'];
  unit: Unit;
};

export type Query = {
  __typename?: 'Query';
  getHello: Scalars['String'];
  salesLine: SalesLine;
  sale: Sale;
  medicineType: MedicineType;
  command: Command;
  providersPaginate: ProviderPagination;
  providers: Array<Provider>;
  contacts: Array<Contact>;
  contactTypes: Array<ContactType>;
  whoAmI: User;
  units: Array<Unit>;
  commandLine: CommandLine;
};


export type QuerySalesLineArgs = {
  id: Scalars['Int'];
};


export type QuerySaleArgs = {
  id: Scalars['Int'];
};


export type QueryMedicineTypeArgs = {
  id: Scalars['Int'];
};


export type QueryCommandArgs = {
  id: Scalars['Int'];
};


export type QueryProvidersPaginateArgs = {
  input: PaginationInput;
};


export type QueryCommandLineArgs = {
  id: Scalars['Int'];
};

export type Sale = {
  __typename?: 'Sale';
  id: Scalars['Int'];
};

export type SalesLine = {
  __typename?: 'SalesLine';
  id: Scalars['Int'];
  unitPrice: Scalars['Float'];
  quantity: Scalars['Float'];
  vat: Scalars['Float'];
  sale: Sale;
  medicine: Medicine;
  unit: Unit;
};

export type Unit = {
  __typename?: 'Unit';
  id: Scalars['Int'];
  label: Scalars['String'];
  description: Scalars['String'];
  parentId: Scalars['Int'];
};

export type UpdateCommandLineInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateContactTypeInput = {
  label?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};

export type UpdateInvoiceInput = {
  id: Scalars['Float'];
  dueDate: Scalars['String'];
  reference: Scalars['String'];
};

export type UpdateMedicineTypeInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdatePaymentModeInput = {
  id: Scalars['Int'];
  label: Scalars['String'];
};

export type UpdateSaleInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateSalesLineInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateUnitInput = {
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
  id: Scalars['Float'];
};

export type UpdateUserInput = {
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  password: Scalars['String'];
  avatar: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};
