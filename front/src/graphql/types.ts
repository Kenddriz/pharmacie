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

export type AddCommandLineInput = {
  commandId: Scalars['Float'];
  commandLine: CommandLineInput;
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

export type AssuredLineInput = {
  quantity: Scalars['Int'];
  price: Scalars['Float'];
  vat: Scalars['Float'];
  discount: Scalars['Float'];
  medicineId: Scalars['Float'];
  expirationDate: Scalars['String'];
};

export type AuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Batch = {
  __typename?: 'Batch';
  id: Scalars['Float'];
  medicine: Medicine;
  stockMovements: Array<StockMovement>;
  expirationDate: Scalars['String'];
  currentStock: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  archivedAt: Scalars['DateTime'];
};

export type BatchFormInput = {
  medicineId: Scalars['Int'];
  expirationDate: Scalars['String'];
  currentStock?: Maybe<Scalars['Int']>;
};

export type Command = {
  __typename?: 'Command';
  id: Scalars['Float'];
  invoice?: Maybe<Invoice>;
  commandLines?: Maybe<Array<CommandLine>>;
  provider: Provider;
  createdAt: Scalars['DateTime'];
  archivedAt: Scalars['DateTime'];
};

export type CommandLine = {
  __typename?: 'CommandLine';
  id: Scalars['String'];
  quantity: Scalars['Float'];
  medicine: Medicine;
  command: Command;
  commandId: Scalars['Float'];
  archivedAt: Scalars['DateTime'];
};

export type CommandLineInput = {
  medicineId: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type CommandPagination = {
  __typename?: 'CommandPagination';
  items: Array<Command>;
  meta: Meta;
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

export type CreateCommandInput = {
  providerId: Scalars['Float'];
  commandLines: Array<CommandLineInput>;
};

export type CreateFormInput = {
  label: Scalars['String'];
};

export type CreateInvoiceInput = {
  invoice: InvoiceInput;
  assuredLines: Array<AssuredLineInput>;
};

export type CreatePackagingInput = {
  label: Scalars['String'];
  multiplicity: Scalars['Int'];
};

export type CreatePaymentInput = {
  invoiceId: Scalars['Float'];
  form: PaymentFormInput;
};

export type CreateSaleInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type DeleteCommandLineInput = {
  commandLineId: Scalars['String'];
  commandId: Scalars['Int'];
};

export type DeleteMedicineInput = {
  medicineId: Scalars['Int'];
  articleId: Scalars['Int'];
};

export type Dosage = {
  __typename?: 'Dosage';
  id: Scalars['Float'];
  parentId: Scalars['Float'];
  label: Scalars['String'];
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type FindExistingBatchInput = {
  medicineId: Scalars['Float'];
  expirationDate: Scalars['String'];
};

export type Form = {
  __typename?: 'Form';
  id: Scalars['Float'];
  label: Scalars['String'];
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type Invoice = {
  __typename?: 'Invoice';
  id: Scalars['Float'];
  deliveryDate: Scalars['String'];
  dueDate: Scalars['String'];
  payment?: Maybe<Payment>;
  command: Command;
  stockMovements: Array<StockMovement>;
  expense: Scalars['Float'];
  reference: Scalars['String'];
  createdAt: Scalars['DateTime'];
  archivedAt: Scalars['DateTime'];
};

export type InvoiceInput = {
  commandId: Scalars['Float'];
  dueDate: Scalars['String'];
  reference: Scalars['String'];
  expense: Scalars['Float'];
  deliveryDate: Scalars['String'];
};

export type InvoicePagination = {
  __typename?: 'InvoicePagination';
  items: Array<Invoice>;
  meta: Meta;
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
  currentSalePrice: Scalars['Float'];
  stockTotal: Scalars['Int'];
  currentVat: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  archivedAt: Scalars['DateTime'];
};

export type MedicineInputForm = {
  articleId: Scalars['Int'];
  formId: Scalars['Int'];
  dosageId: Scalars['Int'];
  packagingId: Scalars['Int'];
  currentSalePrice: Scalars['Float'];
  currentVat: Scalars['Float'];
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
  label: Scalars['String'];
  archivedAt: Scalars['DateTime'];
};

export type MethodInput = {
  id?: Maybe<Scalars['Float']>;
  label: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  saveProvider: Provider;
  createCommand: Command;
  updateCommand: Command;
  deleteCommand: Scalars['Boolean'];
  addCommandLine: Command;
  updateCommandLine: CommandLine;
  removeCommandLine: Command;
  createMedicine: Article;
  updateMedicine: Medicine;
  softRemoveMedicine: Article;
  deleteMedicine: Article;
  recoverMedicine: Article;
  createForm?: Maybe<Form>;
  updateForm?: Maybe<Form>;
  removeForm: Form;
  saveDosage: Dosage;
  removeDosage: Dosage;
  createPackaging: Packaging;
  updatePackaging: Packaging;
  saveArticle: Article;
  removeArticle: Article;
  updateAssuredLine: StockMovement;
  createInvoice: Command;
  updateInvoice: Invoice;
  removeInvoice: Invoice;
  createPayment: Invoice;
  updatePayment: Payment;
  createMethod: Method;
  updateMethod: Method;
  createBatch?: Maybe<Medicine>;
  updateBatch: Batch;
  softRemove: Batch;
  createSale: Sale;
  updateSale: Sale;
  removeSale: Sale;
  findAll: Prescription;
  updatePrescription: Prescription;
  removePrescription: Prescription;
  updatePatient: Patient;
  removePatient: Patient;
  login: LoginDto;
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
  input: CreateCommandInput;
};


export type MutationUpdateCommandArgs = {
  input: UpdateCommandInput;
};


export type MutationDeleteCommandArgs = {
  id: Scalars['Int'];
};


export type MutationAddCommandLineArgs = {
  input: AddCommandLineInput;
};


export type MutationUpdateCommandLineArgs = {
  input: UpdateCommandLineInput;
};


export type MutationRemoveCommandLineArgs = {
  input: DeleteCommandLineInput;
};


export type MutationCreateMedicineArgs = {
  input: MedicineInputForm;
};


export type MutationUpdateMedicineArgs = {
  input: UpdateMedicineInput;
};


export type MutationSoftRemoveMedicineArgs = {
  input: DeleteMedicineInput;
};


export type MutationDeleteMedicineArgs = {
  input: DeleteMedicineInput;
};


export type MutationRecoverMedicineArgs = {
  input: DeleteMedicineInput;
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


export type MutationUpdateAssuredLineArgs = {
  input: UpdateAssuredLineInput;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};


export type MutationRemoveInvoiceArgs = {
  id: Scalars['Int'];
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationUpdatePaymentArgs = {
  input: UpdatePaymentInput;
};


export type MutationCreateMethodArgs = {
  input: MethodInput;
};


export type MutationUpdateMethodArgs = {
  input: MethodInput;
};


export type MutationCreateBatchArgs = {
  input: BatchFormInput;
};


export type MutationUpdateBatchArgs = {
  input: UpdateBatchInput;
};


export type MutationSoftRemoveArgs = {
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


export type MutationUpdatePrescriptionArgs = {
  input: UpdatePrescriptionInput;
};


export type MutationRemovePrescriptionArgs = {
  id: Scalars['Int'];
};


export type MutationUpdatePatientArgs = {
  input: UpdatePatientInput;
};


export type MutationRemovePatientArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: AuthInput;
};

export type Packaging = {
  __typename?: 'Packaging';
  id: Scalars['Float'];
  units: Array<Unit>;
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type PaginateStockMovementInput = {
  medicineId: Scalars['Float'];
  page: Scalars['Float'];
  limit: Scalars['Float'];
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
  note: Scalars['String'];
  method: Method;
  invoice: Invoice;
  date: Scalars['String'];
  archivedAt: Scalars['DateTime'];
};

export type PaymentFormInput = {
  methodeId: Scalars['Float'];
  reference: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  date: Scalars['String'];
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

export type ProviderCommandsChart = {
  __typename?: 'ProviderCommandsChart';
  month: Scalars['Float'];
  command: Scalars['Float'];
  invoice: Scalars['Float'];
};

export type ProviderCommandsChartInput = {
  year: Scalars['Int'];
  providerId: Scalars['Int'];
};

export type ProviderCommandsInput = {
  year: Scalars['Int'];
  providerId: Scalars['Int'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
};

export type ProviderPagination = {
  __typename?: 'ProviderPagination';
  items: Array<Provider>;
  meta: Meta;
};

export type Query = {
  __typename?: 'Query';
  paginateProviders: ProviderPagination;
  providers: Array<Provider>;
  providerCommands: CommandPagination;
  providerCommandsChart: Array<ProviderCommandsChart>;
  paginateCommands: CommandPagination;
  findCommandById: Command;
  medicines: Array<Medicine>;
  forms: Array<Form>;
  dosages: Array<Dosage>;
  packaging: Array<Packaging>;
  paginateArticles: ArticlePagination;
  findOneArticle?: Maybe<Article>;
  paginateStockMovement: StockMovementPagination;
  paginateInvoices: InvoicePagination;
  methods: Array<Method>;
  findExistingBatch?: Maybe<Batch>;
  sale: Sale;
  prescription: Array<Prescription>;
  patient: Array<Patient>;
  whoAmI: User;
};


export type QueryPaginateProvidersArgs = {
  input: PaginationInput;
};


export type QueryProviderCommandsArgs = {
  input: ProviderCommandsInput;
};


export type QueryProviderCommandsChartArgs = {
  input: ProviderCommandsChartInput;
};


export type QueryPaginateCommandsArgs = {
  paginationInput: PaginationInput;
};


export type QueryFindCommandByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPaginateArticlesArgs = {
  input: PaginationInput;
};


export type QueryFindOneArticleArgs = {
  keyword: Scalars['String'];
};


export type QueryPaginateStockMovementArgs = {
  input: PaginateStockMovementInput;
};


export type QueryPaginateInvoicesArgs = {
  paginationInput: PaginationInput;
};


export type QueryFindExistingBatchArgs = {
  input: FindExistingBatchInput;
};


export type QuerySaleArgs = {
  id: Scalars['Int'];
};

export type Sale = {
  __typename?: 'Sale';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  prescription?: Maybe<Prescription>;
  stockMovements: Array<StockMovement>;
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

export type StockMovement = {
  __typename?: 'StockMovement';
  id: Scalars['Int'];
  batch: Batch;
  invoice?: Maybe<Invoice>;
  sale?: Maybe<Sale>;
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  stock: Scalars['Float'];
  discount: Scalars['Float'];
  vat: Scalars['Float'];
};

export type StockMovementFormInput = {
  quantity: Scalars['Int'];
  price: Scalars['Float'];
  vat: Scalars['Float'];
  discount: Scalars['Float'];
};

export type StockMovementPagination = {
  __typename?: 'StockMovementPagination';
  items: Array<StockMovement>;
  meta: Meta;
};

export type Unit = {
  __typename?: 'Unit';
  label: Scalars['String'];
  multiplicity: Scalars['Float'];
};

export type UpdateAssuredLineInput = {
  id: Scalars['Int'];
  updateCurVat: Scalars['Boolean'];
  batch: BatchFormInput;
  assuredLine: StockMovementFormInput;
};

export type UpdateBatchInput = {
  id: Scalars['Int'];
  form: BatchFormInput;
};

export type UpdateCommandInput = {
  id: Scalars['Float'];
  providerId: Scalars['Float'];
};

export type UpdateCommandLineInput = {
  id: Scalars['String'];
  commandLine: CommandLineInput;
};

export type UpdateFormInput = {
  label: Scalars['String'];
  id: Scalars['Int'];
};

export type UpdateInvoiceInput = {
  dueDate?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  expense?: Maybe<Scalars['Float']>;
  deliveryDate?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};

export type UpdateMedicineInput = {
  id: Scalars['Int'];
  form: MedicineInputForm;
};

export type UpdatePackagingInput = {
  id: Scalars['Int'];
  units: Array<CreatePackagingInput>;
};

export type UpdatePatientInput = {
  id: Scalars['Int'];
};

export type UpdatePaymentInput = {
  id: Scalars['Float'];
  form: PaymentFormInput;
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
