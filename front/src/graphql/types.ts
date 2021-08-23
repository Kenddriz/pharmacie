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

export type Article = {
  __typename?: 'Article';
  id: Scalars['Float'];
  dci: Scalars['String'];
  commercialName: Scalars['String'];
  medicines?: Maybe<Array<Medicine>>;
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type ArticlePagination = {
  __typename?: 'ArticlePagination';
  items: Array<Article>;
  meta: Meta;
};

export type AssuredLine = {
  __typename?: 'AssuredLine';
  id: Scalars['Int'];
  delivery: Delivery;
  expirationDate: Scalars['String'];
  quantity: Scalars['Float'];
  batch: Batch;
};

export type AuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Batch = {
  __typename?: 'Batch';
  id: Scalars['Float'];
  medicine: Medicine;
  assuredLines: Array<AssuredLine>;
  saleLines: Array<SaleLine>;
  manufactureDate: Scalars['String'];
  expirationDate: Scalars['String'];
  stock: Scalars['String'];
  archivedAt: Scalars['DateTime'];
};

export type Command = {
  __typename?: 'Command';
  id: Scalars['Float'];
  delivery?: Maybe<Delivery>;
  commandLines?: Maybe<Array<CommandLine>>;
  provider: Provider;
  createdAt: Scalars['DateTime'];
  archivedAt: Scalars['DateTime'];
};

export type CommandLine = {
  __typename?: 'CommandLine';
  id: Scalars['Float'];
  quantity: Scalars['Float'];
  medicine: Medicine;
  command: Command;
  archivedAt: Scalars['DateTime'];
};

export type Contact = {
  __typename?: 'Contact';
  type: Scalars['Float'];
  list: Array<Scalars['String']>;
};

export type ContactInput = {
  type: Scalars['Float'];
  list: Array<Scalars['String']>;
};

export type CreateAssuredLineInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateCommandInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateCommandLineInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateDeliveryInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateInvoiceInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateMethodInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreatePackagingInput = {
  label: Scalars['String'];
  multiplicity: Scalars['Float'];
};

export type CreateParcelInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreatePatientInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreatePaymentInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreatePrescriptionInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateSaleInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateSaleLineInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type Delivery = {
  __typename?: 'Delivery';
  id: Scalars['Float'];
  command: Command;
  invoice?: Maybe<Invoice>;
  assuredLines: Array<AssuredLine>;
  createdAt: Scalars['DateTime'];
  archivedAt: Scalars['DateTime'];
};

export type Dosage = {
  __typename?: 'Dosage';
  id: Scalars['Float'];
  parentId: Scalars['Float'];
  label: Scalars['String'];
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type Form = {
  __typename?: 'Form';
  id: Scalars['Float'];
  label: Scalars['String'];
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type FormInput = {
  id: Scalars['Int'];
  label: Scalars['String'];
};

export type Invoice = {
  __typename?: 'Invoice';
  id: Scalars['Float'];
  date: Scalars['Float'];
  dueDate: Scalars['Float'];
  payment?: Maybe<Payment>;
  archivedAt: Scalars['DateTime'];
};

export type LoginDto = {
  __typename?: 'LoginDto';
  token: Scalars['String'];
};

export type Medicine = {
  __typename?: 'Medicine';
  id: Scalars['Float'];
  article: Article;
  form: Form;
  dosage: Dosage;
  packaging: Packaging;
  batches: Array<Batch>;
  commandLines?: Maybe<Array<CommandLine>>;
  archivedAt: Scalars['DateTime'];
};

export type MedicineInput = {
  id: Scalars['Int'];
  articleId: Scalars['Int'];
  formId: Scalars['Int'];
  dosageId: Scalars['Int'];
  packagingId: Scalars['Int'];
};

export type Meta = {
  __typename?: 'Meta';
  itemCount: Scalars['Float'];
  totalItems: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalPages: Scalars['Float'];
  currentPage: Scalars['Float'];
};

export type Method = {
  __typename?: 'Method';
  id: Scalars['Float'];
  label: Scalars['Float'];
  archivedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  saveProvider: Provider;
  createCommand: Command;
  updateCommand: Command;
  removeCommand: Command;
  createCommandLine: CommandLine;
  updateCommandLine: CommandLine;
  removeCommandLine: CommandLine;
  saveMedicine: Medicine;
  softRemoveMedicine: Scalars['Boolean'];
  deleteMedicine: Scalars['Boolean'];
  recoverMedicine: Scalars['Boolean'];
  saveForm: Form;
  removeForm: Form;
  saveDosage: Dosage;
  removeDosage: Dosage;
  createPackaging: Packaging;
  updatePackaging: Packaging;
  saveArticle: Article;
  removeArticle: Article;
  createDelivery: Delivery;
  updateDelivery: Delivery;
  removeDelivery: Delivery;
  createAssuredLine: AssuredLine;
  updateAssuredLine: AssuredLine;
  removeAssuredLine: AssuredLine;
  createInvoice: Invoice;
  updateInvoice: Invoice;
  removeInvoice: Invoice;
  createPayment: Payment;
  updatePayment: Payment;
  removePayment: Payment;
  createMethod: Method;
  updateMethod: Method;
  removeMethod: Method;
  createParcel: Batch;
  updateParcel: Batch;
  removeParcel: Batch;
  createSaleLine: SaleLine;
  updateSaleLine: SaleLine;
  removeSaleLine: SaleLine;
  createSale: Sale;
  updateSale: Sale;
  removeSale: Sale;
  createPatient: Patient;
  updatePatient: Patient;
  removePatient: Patient;
  login: LoginDto;
  createPrescription: Prescription;
  updatePrescription: Prescription;
  removePrescription: Prescription;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationSaveProviderArgs = {
  input: SaveProviderInput;
};


export type MutationCreateCommandArgs = {
  createCommandInput: CreateCommandInput;
};


export type MutationUpdateCommandArgs = {
  updateCommandInput: UpdateCommandInput;
};


export type MutationRemoveCommandArgs = {
  id: Scalars['Int'];
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


export type MutationSaveMedicineArgs = {
  input: MedicineInput;
};


export type MutationSoftRemoveMedicineArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMedicineArgs = {
  id: Scalars['Int'];
};


export type MutationRecoverMedicineArgs = {
  id: Scalars['Int'];
};


export type MutationSaveFormArgs = {
  input: FormInput;
};


export type MutationRemoveFormArgs = {
  id: Scalars['Int'];
};


export type MutationSaveDosageArgs = {
  input: SaveDosageInput;
};


export type MutationRemoveDosageArgs = {
  id: Scalars['Int'];
};


export type MutationCreatePackagingArgs = {
  input: Array<CreatePackagingInput>;
};


export type MutationUpdatePackagingArgs = {
  input: UpdatePackagingInput;
};


export type MutationSaveArticleArgs = {
  input: SaveArticleInput;
};


export type MutationRemoveArticleArgs = {
  id: Scalars['Int'];
};


export type MutationCreateDeliveryArgs = {
  createDeliveryInput: CreateDeliveryInput;
};


export type MutationUpdateDeliveryArgs = {
  updateDeliveryInput: UpdateDeliveryInput;
};


export type MutationRemoveDeliveryArgs = {
  id: Scalars['Int'];
};


export type MutationCreateAssuredLineArgs = {
  createAssuredLineInput: CreateAssuredLineInput;
};


export type MutationUpdateAssuredLineArgs = {
  updateAssuredLineInput: UpdateAssuredLineInput;
};


export type MutationRemoveAssuredLineArgs = {
  id: Scalars['Int'];
};


export type MutationCreateInvoiceArgs = {
  createInvoiceInput: CreateInvoiceInput;
};


export type MutationUpdateInvoiceArgs = {
  updateInvoiceInput: UpdateInvoiceInput;
};


export type MutationRemoveInvoiceArgs = {
  id: Scalars['Int'];
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationUpdatePaymentArgs = {
  updatePaymentInput: UpdatePaymentInput;
};


export type MutationRemovePaymentArgs = {
  id: Scalars['Int'];
};


export type MutationCreateMethodArgs = {
  createMethodInput: CreateMethodInput;
};


export type MutationUpdateMethodArgs = {
  updateMethodInput: UpdateMethodInput;
};


export type MutationRemoveMethodArgs = {
  id: Scalars['Int'];
};


export type MutationCreateParcelArgs = {
  createParcelInput: CreateParcelInput;
};


export type MutationUpdateParcelArgs = {
  updateParcelInput: UpdateParcelInput;
};


export type MutationRemoveParcelArgs = {
  id: Scalars['Int'];
};


export type MutationCreateSaleLineArgs = {
  createSaleLineInput: CreateSaleLineInput;
};


export type MutationUpdateSaleLineArgs = {
  updateSaleLineInput: UpdateSaleLineInput;
};


export type MutationRemoveSaleLineArgs = {
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


export type MutationCreatePatientArgs = {
  createPatientInput: CreatePatientInput;
};


export type MutationUpdatePatientArgs = {
  updatePatientInput: UpdatePatientInput;
};


export type MutationRemovePatientArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: AuthInput;
};


export type MutationCreatePrescriptionArgs = {
  createPrescriptionInput: CreatePrescriptionInput;
};


export type MutationUpdatePrescriptionArgs = {
  updatePrescriptionInput: UpdatePrescriptionInput;
};


export type MutationRemovePrescriptionArgs = {
  id: Scalars['Int'];
};

export type Packaging = {
  __typename?: 'Packaging';
  id: Scalars['Float'];
  units: Array<Unit>;
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type PaginationInput = {
  keyword?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  limit: Scalars['Float'];
};

export type Patient = {
  __typename?: 'Patient';
  id: Scalars['Float'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  phone: Scalars['String'];
  prescriptions: Array<Prescription>;
  archivedAt: Scalars['DateTime'];
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['Float'];
  reference: Scalars['String'];
  method: Method;
  date: Scalars['String'];
  archivedAt: Scalars['DateTime'];
};

export type Prescription = {
  __typename?: 'Prescription';
  id: Scalars['Float'];
  reference: Scalars['String'];
  description: Scalars['String'];
  patient: Patient;
  archivedAt: Scalars['DateTime'];
};

export type Provider = {
  __typename?: 'Provider';
  id: Scalars['Float'];
  name: Scalars['String'];
  contacts: Array<Contact>;
  address: Scalars['String'];
  logo: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  commands: Array<Command>;
  archivedAt: Scalars['DateTime'];
};

export type ProviderPagination = {
  __typename?: 'ProviderPagination';
  items: Array<Provider>;
  meta: Meta;
};

export type Query = {
  __typename?: 'Query';
  providersPaginate: ProviderPagination;
  providers: Array<Provider>;
  command: Command;
  commandLine: CommandLine;
  findAll: Array<Medicine>;
  forms: Array<Form>;
  dosages: Array<Dosage>;
  packaging: Array<Packaging>;
  paginateArticles: ArticlePagination;
  delivery: Delivery;
  assuredLine: AssuredLine;
  invoice: Invoice;
  payment: Payment;
  method: Method;
  parcel: Batch;
  saleLine: SaleLine;
  sale: Sale;
  patient: Patient;
  whoAmI: User;
  prescription: Prescription;
};


export type QueryProvidersPaginateArgs = {
  input: PaginationInput;
};


export type QueryCommandArgs = {
  id: Scalars['Int'];
};


export type QueryCommandLineArgs = {
  id: Scalars['Int'];
};


export type QueryPaginateArticlesArgs = {
  input: PaginationInput;
};


export type QueryDeliveryArgs = {
  id: Scalars['Int'];
};


export type QueryAssuredLineArgs = {
  id: Scalars['Int'];
};


export type QueryInvoiceArgs = {
  id: Scalars['Int'];
};


export type QueryPaymentArgs = {
  id: Scalars['Int'];
};


export type QueryMethodArgs = {
  id: Scalars['Int'];
};


export type QueryParcelArgs = {
  id: Scalars['Int'];
};


export type QuerySaleLineArgs = {
  id: Scalars['Int'];
};


export type QuerySaleArgs = {
  id: Scalars['Int'];
};


export type QueryPatientArgs = {
  id: Scalars['Int'];
};


export type QueryPrescriptionArgs = {
  id: Scalars['Int'];
};

export type Sale = {
  __typename?: 'Sale';
  id: Scalars['Float'];
  date: Scalars['String'];
  prescription?: Maybe<Prescription>;
  saleLines: Array<SaleLine>;
  archivedAt: Scalars['DateTime'];
};

export type SaleLine = {
  __typename?: 'SaleLine';
  id: Scalars['Float'];
  saleId: Scalars['Float'];
  quantity: Scalars['Float'];
  batches: Batch;
  sales: Sale;
  archivedAt: Scalars['DateTime'];
};

export type SaveArticleInput = {
  id?: Maybe<Scalars['Int']>;
  dci: Scalars['String'];
  commercialName: Scalars['String'];
};

export type SaveDosageInput = {
  id: Scalars['Float'];
  parentId: Scalars['Float'];
  label: Scalars['String'];
};

export type SaveProviderInput = {
  id: Scalars['Float'];
  name: Scalars['String'];
  address: Scalars['String'];
  contacts: Array<ContactInput>;
};

export type Unit = {
  __typename?: 'Unit';
  label: Scalars['String'];
  multiplicity: Scalars['Float'];
};

export type UpdateAssuredLineInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateCommandInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateCommandLineInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateDeliveryInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateInvoiceInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateMethodInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdatePackagingInput = {
  id: Scalars['Float'];
  units: Array<CreatePackagingInput>;
};

export type UpdateParcelInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdatePatientInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdatePaymentInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdatePrescriptionInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateSaleInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateSaleLineInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
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
