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

export type AddContactInput = {
  providerId: Scalars['Float'];
  contactTypeId: Scalars['Float'];
  contacts: Array<Scalars['String']>;
};

export type AuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Command = {
  __typename?: 'Command';
  id: Scalars['Float'];
  provider: Provider;
  arrived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  commandLines: Array<CommandLine>;
};

export type CommandLine = {
  __typename?: 'CommandLine';
  id: Scalars['Float'];
  unit: Unit;
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  medicine: Scalars['String'];
  form: Form;
  commandId: Scalars['Float'];
  vat: Scalars['Float'];
};

export type CommandLineInput = {
  id?: Maybe<Scalars['Float']>;
  medicine: Scalars['String'];
  unitId: Scalars['Float'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  formId: Scalars['Float'];
  vat: Scalars['Float'];
};

export type CommandPagination = {
  __typename?: 'CommandPagination';
  items: Array<Command>;
  meta: Meta;
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['Int'];
  label: Scalars['String'];
  contactTypeId: Scalars['Float'];
};

export type ContactType = {
  __typename?: 'ContactType';
  id: Scalars['Int'];
  label: Scalars['String'];
};

export type CreateCommandInput = {
  providerId: Scalars['Float'];
};

export type CreateContactInput = {
  contactTypeId: Scalars['Float'];
  contacts: Array<Scalars['String']>;
};

export type CreateContactTypeInput = {
  label: Scalars['String'];
};

export type CreateFormInput = {
  label: Scalars['String'];
};

export type CreateInvoiceInput = {
  dueDate: Scalars['String'];
  reference: Scalars['String'];
};

export type CreateMedicineFormInput = {
  medicineId?: Maybe<Scalars['Int']>;
  formId: Scalars['Int'];
  unitId: Scalars['Int'];
  expiration: Scalars['String'];
  price: Scalars['Float'];
  vat: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type CreateMedicineInput = {
  designation: Scalars['String'];
  medicineForms: Array<CreateMedicineFormInput>;
};

export type CreateOrUpdateCommandLineInput = {
  commandId: Scalars['Float'];
  commandLines: Array<CommandLineInput>;
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
  address: Scalars['String'];
  contactTypes: Array<CreateContactInput>;
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
  multiplicity: Scalars['Float'];
  description: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type Form = {
  __typename?: 'Form';
  id: Scalars['Int'];
  label: Scalars['String'];
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
  medicineForms: Array<MedicineForm>;
};

export type MedicineForm = {
  __typename?: 'MedicineForm';
  id: Scalars['Int'];
  expiration: Scalars['String'];
  vat: Scalars['Float'];
  stock: Scalars['Float'];
  shop: Scalars['Float'];
  price: Scalars['Float'];
  unit: Unit;
  form: Form;
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
  createInvoice: Invoice;
  updateInvoice: Invoice;
  createCommand: Command;
  updateCommand: Command;
  addCommandLine: Command;
  updateCommandLine: Command;
  removeCommandLine: Command;
  createProvider: Provider;
  addContacts: Provider;
  updateContact: Contact;
  createContactType: ContactType;
  updateContactType: ContactType;
  createPayment: Invoice;
  updatePaymentMode: PaymentMode;
  createMedicine: Medicine;
  addMedicineForm: Medicine;
  updateMedicineForm: MedicineForm;
  updateMedicine: Medicine;
  createForm: Form;
  updateForm: Form;
  removeForm: Form;
  removeMedicineForm: MedicineForm;
  createUser: User;
  updateUser: User;
  login: LoginDto;
  createUnit: Unit;
  updateUnit: Unit;
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


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};


export type MutationCreateCommandArgs = {
  input: CreateCommandInput;
};


export type MutationUpdateCommandArgs = {
  input: UpdateCommandInput;
};


export type MutationAddCommandLineArgs = {
  input: CreateOrUpdateCommandLineInput;
};


export type MutationUpdateCommandLineArgs = {
  input: CreateOrUpdateCommandLineInput;
};


export type MutationRemoveCommandLineArgs = {
  id: Scalars['Float'];
};


export type MutationCreateProviderArgs = {
  input: CreateProviderInput;
};


export type MutationAddContactsArgs = {
  input: AddContactInput;
};


export type MutationUpdateContactArgs = {
  input: UpdateContactInput;
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


export type MutationAddMedicineFormArgs = {
  input: CreateMedicineFormInput;
};


export type MutationUpdateMedicineFormArgs = {
  input: UpdateMedicineFormInput;
};


export type MutationUpdateMedicineArgs = {
  input: UpdateMedicineInput;
};


export type MutationCreateFormArgs = {
  input: CreateFormInput;
};


export type MutationUpdateFormArgs = {
  input: UpdateFormInput;
};


export type MutationRemoveFormArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveMedicineFormArgs = {
  id: Scalars['Int'];
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

export type PaginationInput = {
  keyword?: Maybe<Scalars['String']>;
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
  address: Scalars['String'];
  logo: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  contacts: Array<Contact>;
  commands: Array<Command>;
};

export type ProviderPagination = {
  __typename?: 'ProviderPagination';
  items: Array<Provider>;
  meta: Meta;
};

export type Query = {
  __typename?: 'Query';
  getHello: Scalars['String'];
  salesLine: SalesLine;
  sale: Sale;
  paginateCommands: CommandPagination;
  providersPaginate: ProviderPagination;
  providers: Array<Provider>;
  contactTypes: Array<ContactType>;
  medicines: Array<Medicine>;
  forms: Array<Form>;
  whoAmI: User;
  units: Array<Unit>;
};


export type QuerySalesLineArgs = {
  id: Scalars['Int'];
};


export type QuerySaleArgs = {
  id: Scalars['Int'];
};


export type QueryPaginateCommandsArgs = {
  paginationInput: PaginationInput;
};


export type QueryProvidersPaginateArgs = {
  input: PaginationInput;
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
  multiplicity: Scalars['Float'];
  description: Scalars['String'];
  parentId: Scalars['Float'];
};

export type UpdateCommandInput = {
  id: Scalars['Float'];
  providerId: Scalars['Float'];
  arrived?: Maybe<Scalars['Boolean']>;
};

export type UpdateContactInput = {
  id: Scalars['Float'];
  label: Scalars['String'];
};

export type UpdateContactTypeInput = {
  label?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};

export type UpdateFormInput = {
  label?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type UpdateInvoiceInput = {
  id: Scalars['Float'];
  dueDate: Scalars['String'];
  reference: Scalars['String'];
};

export type UpdateMedicineFormInput = {
  id: Scalars['Int'];
  medicineId: Scalars['Int'];
  formId: Scalars['Int'];
  unitId: Scalars['Int'];
  expiration: Scalars['String'];
  price: Scalars['Float'];
  vat: Scalars['Float'];
  stock: Scalars['Float'];
  shop: Scalars['Float'];
};

export type UpdateMedicineInput = {
  id: Scalars['Int'];
  designation: Scalars['String'];
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
  multiplicity?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Float']>;
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
