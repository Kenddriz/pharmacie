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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddCommandLineInput = {
  commandId: Scalars['Float'];
  commandLine: CommandLineInput;
};

export type AddSaleLineInput = {
  saleId: Scalars['Int'];
  saleLines: Array<SaleLineInput>;
};

export type Article = {
  __typename?: 'Article';
  id: Scalars['Float'];
  dci: Scalars['String'];
  commercialName: Scalars['String'];
  medicines: Array<Medicine>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type BatchFormInput = {
  medicineId: Scalars['Int'];
  expirationDate: Scalars['String'];
  currentStock?: Maybe<Scalars['Int']>;
};

export type BatchPaginationOutput = {
  __typename?: 'BatchPaginationOutput';
  items: Array<Batch>;
  meta: Meta;
};

export type CancelSaleLineOutput = {
  __typename?: 'CancelSaleLineOutput';
  sale: Sale;
  batches: Array<Batch>;
};

export type CancelSaleLinesInput = {
  saleId: Scalars['Int'];
  saleLineIds: Array<Scalars['Int']>;
};

export type Command = {
  __typename?: 'Command';
  id: Scalars['Float'];
  invoice?: Maybe<Invoice>;
  commandLines?: Maybe<Array<CommandLine>>;
  provider: Provider;
  createdAt: Scalars['DateTime'];
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type CommandLine = {
  __typename?: 'CommandLine';
  id: Scalars['String'];
  quantity: Scalars['Float'];
  medicine: Medicine;
  command: Command;
  commandId: Scalars['Float'];
  archivedAt?: Maybe<Scalars['DateTime']>;
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

export type CommandsMonthly = {
  __typename?: 'CommandsMonthly';
  month: Scalars['Float'];
  command: Scalars['Float'];
  invoice: Scalars['Float'];
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

export type Count2LatestWeekSales = {
  __typename?: 'Count2LatestWeekSales';
  last: Array<CountSaleDaily>;
  current: Array<CountSaleDaily>;
};

export type CountSaleDaily = {
  __typename?: 'CountSaleDaily';
  day: Scalars['String'];
  count: Scalars['Int'];
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

export type CreateMedicineInput = {
  articleId: Scalars['Int'];
  form: MedicineFormInput;
};

export type CreatePackagingInput = {
  label: Scalars['String'];
  multiplicity: Scalars['Int'];
};

export type CreatePatientInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type CreatePaymentInput = {
  invoiceId: Scalars['Float'];
  form: PaymentFormInput;
};

export type CreatePrescriptionInput = {
  reference: Scalars['String'];
  description: Scalars['String'];
  patient: CreatePatientInput;
  saleId: Scalars['Float'];
};

export type CreateSaleInput = {
  prescription?: Maybe<PrescriptionInput>;
  saleLines: Array<SaleLineInput>;
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type DeletePrescriptionInput = {
  id: Scalars['Float'];
  saleId: Scalars['Float'];
};

export type Dosage = {
  __typename?: 'Dosage';
  id: Scalars['Float'];
  parentId: Scalars['Float'];
  label: Scalars['String'];
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type FindByMeasureInput = {
  id: Scalars['Int'];
  foreignKey: Scalars['String'];
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
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type MedicineFormInput = {
  formId: Scalars['Int'];
  dosageId: Scalars['Int'];
  packagingId: Scalars['Int'];
  currentSalePrice: Scalars['Float'];
  currentVat: Scalars['Float'];
};

export type MedicinePaginationOutput = {
  __typename?: 'MedicinePaginationOutput';
  items: Array<Medicine>;
  meta: Meta;
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

export type MostConsumedMedicineOutput = {
  __typename?: 'MostConsumedMedicineOutput';
  medicine: Medicine;
  count: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  removeAllArchived: Scalars['Float'];
  createUser: User;
  updateUser: User;
  updatePassword?: Maybe<User>;
  updateUserAvatar: User;
  saveProvider: Provider;
  softRemoveProvider: Provider;
  removeProvider: Scalars['Boolean'];
  restoreProvider?: Maybe<Provider>;
  updateProviderAvatar: Provider;
  createCommand: Command;
  updateCommand: Command;
  softRemoveCommand: Command;
  removeCommand: Scalars['Boolean'];
  restoreCommand?: Maybe<Command>;
  addCommandLine: Command;
  updateCommandLine: CommandLine;
  removeCommandLine: Command;
  createMedicine: Article;
  updateMedicine: Medicine;
  softRemoveMedicine: SoftRemoveMedicineOutput;
  removeMedicine: Scalars['Boolean'];
  restoreMedicine?: Maybe<Article>;
  createForm?: Maybe<Form>;
  updateForm?: Maybe<Form>;
  deleteForm: Scalars['Boolean'];
  saveDosage: Dosage;
  deleteDosage: Scalars['Boolean'];
  createPackaging: Packaging;
  updatePackaging: Packaging;
  softRemovePackaging: Packaging;
  removePackaging: Scalars['Boolean'];
  restorePackaging: Packaging;
  saveArticle: Article;
  softRemoveArticle: Article;
  removeArticle: Scalars['Boolean'];
  restoreArticle?: Maybe<Article>;
  updateAssuredLine: StockMovement;
  updateSaleLine: StockMovement;
  cancelSaleLines: CancelSaleLineOutput;
  addSaleLines: Sale;
  createInvoice: Command;
  updateInvoice: Invoice;
  softRemoveInvoice: Invoice;
  removeInvoice: Scalars['Boolean'];
  restoreInvoice?: Maybe<Invoice>;
  createPayment: Invoice;
  updatePayment: Payment;
  createMethod: Method;
  updateMethod: Method;
  removeMethod: Scalars['Boolean'];
  createBatch?: Maybe<Medicine>;
  updateBatch: Batch;
  softRemoveBatch: SoftRemoveBatchOutput;
  removeBatch: Scalars['Boolean'];
  restoreBatch?: Maybe<Medicine>;
  createSale: Sale;
  softRemoveSale?: Maybe<Sale>;
  removeSale: Scalars['Boolean'];
  restoreSale?: Maybe<Sale>;
  createPrescription: Sale;
  updatePrescription: Prescription;
  deletePrescription: Sale;
  updatePatient: Patient;
  removePatient: Patient;
  login: LoginDto;
};


export type MutationRemoveAllArchivedArgs = {
  repo: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdateUserAvatarArgs = {
  avatar: Scalars['Upload'];
};


export type MutationSaveProviderArgs = {
  input: SaveProviderInput;
};


export type MutationSoftRemoveProviderArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveProviderArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreProviderArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateProviderAvatarArgs = {
  id: Scalars['Int'];
  avatar: Scalars['Upload'];
};


export type MutationCreateCommandArgs = {
  input: CreateCommandInput;
};


export type MutationUpdateCommandArgs = {
  input: UpdateCommandInput;
};


export type MutationSoftRemoveCommandArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCommandArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreCommandArgs = {
  id: Scalars['Int'];
};


export type MutationAddCommandLineArgs = {
  input: AddCommandLineInput;
};


export type MutationUpdateCommandLineArgs = {
  input: UpdateCommandLineInput;
};


export type MutationRemoveCommandLineArgs = {
  id: Scalars['String'];
};


export type MutationCreateMedicineArgs = {
  input: CreateMedicineInput;
};


export type MutationUpdateMedicineArgs = {
  input: UpdateMedicineInput;
};


export type MutationSoftRemoveMedicineArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveMedicineArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreMedicineArgs = {
  id: Scalars['Int'];
};


export type MutationCreateFormArgs = {
  input: CreateFormInput;
};


export type MutationUpdateFormArgs = {
  input: UpdateFormInput;
};


export type MutationDeleteFormArgs = {
  id: Scalars['Int'];
};


export type MutationSaveDosageArgs = {
  input: SaveDosageInput;
};


export type MutationDeleteDosageArgs = {
  id: Scalars['Int'];
};


export type MutationCreatePackagingArgs = {
  input: Array<CreatePackagingInput>;
};


export type MutationUpdatePackagingArgs = {
  input: UpdatePackagingInput;
};


export type MutationSoftRemovePackagingArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePackagingArgs = {
  id: Scalars['Int'];
};


export type MutationRestorePackagingArgs = {
  id: Scalars['Int'];
};


export type MutationSaveArticleArgs = {
  input: SaveArticleInput;
};


export type MutationSoftRemoveArticleArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveArticleArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreArticleArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateAssuredLineArgs = {
  input: UpdateAssuredLineInput;
};


export type MutationUpdateSaleLineArgs = {
  input: UpdateSaleLineInput;
};


export type MutationCancelSaleLinesArgs = {
  input: CancelSaleLinesInput;
};


export type MutationAddSaleLinesArgs = {
  input: AddSaleLineInput;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};


export type MutationSoftRemoveInvoiceArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveInvoiceArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreInvoiceArgs = {
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


export type MutationRemoveMethodArgs = {
  id: Scalars['Int'];
};


export type MutationCreateBatchArgs = {
  input: BatchFormInput;
};


export type MutationUpdateBatchArgs = {
  input: UpdateBatchInput;
};


export type MutationSoftRemoveBatchArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveBatchArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreBatchArgs = {
  id: Scalars['Int'];
};


export type MutationCreateSaleArgs = {
  input: CreateSaleInput;
};


export type MutationSoftRemoveSaleArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSaleArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreSaleArgs = {
  id: Scalars['Int'];
};


export type MutationCreatePrescriptionArgs = {
  input: CreatePrescriptionInput;
};


export type MutationUpdatePrescriptionArgs = {
  input: UpdatePrescriptionInput;
};


export type MutationDeletePrescriptionArgs = {
  input: DeletePrescriptionInput;
};


export type MutationUpdatePatientArgs = {
  input: CreatePatientInput;
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

export type PaginateArticleInput = {
  keyword?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  limit: Scalars['Float'];
  measureInput?: Maybe<FindByMeasureInput>;
};

export type PaginateInvoiceInput = {
  keyword?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  limit: Scalars['Float'];
  paymentId?: Maybe<Scalars['Float']>;
};

export type PaginatePatientOutput = {
  __typename?: 'PaginatePatientOutput';
  items: Array<Patient>;
  meta: Meta;
};

export type PaginatePatientSalesInput = {
  patientId: Scalars['Int'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
};

export type PaginatePatientSalesOutput = {
  __typename?: 'PaginatePatientSalesOutput';
  items: Array<Sale>;
  meta: Meta;
};

export type PaginateProviderCommandsInput = {
  keyword?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  limit: Scalars['Float'];
  providerInput?: Maybe<ProviderCommandsInput>;
};

export type PaginateStockMovementInput = {
  medicineId: Scalars['Float'];
  batchId?: Maybe<Scalars['Float']>;
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
  name: Scalars['String'];
  phone: Scalars['String'];
  prescriptions: Array<Prescription>;
  archivedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['Float'];
  reference: Scalars['String'];
  note: Scalars['String'];
  method: Method;
  invoice: Invoice;
  date: Scalars['String'];
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  sale: Sale;
  archivedAt: Scalars['DateTime'];
};

export type PrescriptionInput = {
  reference: Scalars['String'];
  description: Scalars['String'];
  patient: CreatePatientInput;
};

export type Provider = {
  __typename?: 'Provider';
  id: Scalars['Float'];
  name: Scalars['String'];
  contacts: Array<Contact>;
  address: Scalars['String'];
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  commands: Array<Command>;
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type ProviderCommandsChart = {
  __typename?: 'ProviderCommandsChart';
  month: Scalars['Float'];
  command: Scalars['Float'];
  invoice: Scalars['Float'];
};

export type ProviderCommandsInput = {
  year: Scalars['Int'];
  providerId: Scalars['Int'];
};

export type ProviderPagination = {
  __typename?: 'ProviderPagination';
  items: Array<Provider>;
  meta: Meta;
};

export type Query = {
  __typename?: 'Query';
  paginateProviders: ProviderPagination;
  providerCommandsChart: Array<ProviderCommandsChart>;
  countProviders: Scalars['Int'];
  paginateDeletedProviders: ProviderPagination;
  paginateCommands: CommandPagination;
  findCommandById: Command;
  countUndeliveredCommands: Scalars['Int'];
  commandsMonthly: Array<CommandsMonthly>;
  paginateDeletedCommands: CommandPagination;
  countMedicines: Scalars['Int'];
  mostConsumedMedicines: Array<MostConsumedMedicineOutput>;
  paginateDeletedMedicines: MedicinePaginationOutput;
  forms: Array<Form>;
  countForms: Scalars['Int'];
  dosages: Array<Dosage>;
  countDosages: Scalars['Int'];
  packaging: Array<Packaging>;
  deletedPackaging: Array<Packaging>;
  paginateArticles: ArticlePagination;
  findOneArticle?: Maybe<Article>;
  countArticles: Scalars['Int'];
  paginateDeletedArticles: ArticlePagination;
  paginateStockMovement: StockMovementPagination;
  paginateInvoices: InvoicePagination;
  countUnpaidInvoices: Scalars['Int'];
  paginateDeletedInvoices: InvoicePagination;
  methods: Array<Method>;
  findExistingBatch?: Maybe<Batch>;
  paginateDeletedBatches: BatchPaginationOutput;
  countStockMovements: Scalars['Float'];
  paginateSales: SalePagination;
  count2LatestWeekSales: Count2LatestWeekSales;
  paginateDeletedSales: SalePagination;
  findSuggestedPatients: Array<Patient>;
  paginatePatients: PaginatePatientOutput;
  paginatePatientSales: PaginatePatientSalesOutput;
  whoAmI: User;
};


export type QueryPaginateProvidersArgs = {
  input: PaginationInput;
};


export type QueryProviderCommandsChartArgs = {
  input: ProviderCommandsInput;
};


export type QueryPaginateDeletedProvidersArgs = {
  input: PaginationInput;
};


export type QueryPaginateCommandsArgs = {
  input: PaginateProviderCommandsInput;
};


export type QueryFindCommandByIdArgs = {
  id: Scalars['Int'];
};


export type QueryCommandsMonthlyArgs = {
  year: Scalars['Int'];
};


export type QueryPaginateDeletedCommandsArgs = {
  input: PaginationInput;
};


export type QueryMostConsumedMedicinesArgs = {
  year: Scalars['Int'];
};


export type QueryPaginateDeletedMedicinesArgs = {
  input: PaginationInput;
};


export type QueryPaginateArticlesArgs = {
  input: PaginateArticleInput;
};


export type QueryFindOneArticleArgs = {
  keyword: Scalars['String'];
};


export type QueryPaginateDeletedArticlesArgs = {
  input: PaginationInput;
};


export type QueryPaginateStockMovementArgs = {
  input: PaginateStockMovementInput;
};


export type QueryPaginateInvoicesArgs = {
  input: PaginateInvoiceInput;
};


export type QueryPaginateDeletedInvoicesArgs = {
  input: PaginationInput;
};


export type QueryFindExistingBatchArgs = {
  input: FindExistingBatchInput;
};


export type QueryPaginateDeletedBatchesArgs = {
  input: PaginationInput;
};


export type QueryCountStockMovementsArgs = {
  id: Scalars['Int'];
};


export type QueryPaginateSalesArgs = {
  paginationInput: PaginationInput;
};


export type QueryPaginateDeletedSalesArgs = {
  input: PaginationInput;
};


export type QueryFindSuggestedPatientsArgs = {
  keyword: Scalars['String'];
};


export type QueryPaginatePatientsArgs = {
  input: PaginationInput;
};


export type QueryPaginatePatientSalesArgs = {
  input: PaginatePatientSalesInput;
};

export type Sale = {
  __typename?: 'Sale';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  prescription?: Maybe<Prescription>;
  stockMovements: Array<StockMovement>;
  archivedAt?: Maybe<Scalars['DateTime']>;
};

export type SaleLineInput = {
  quantity: Scalars['Int'];
  price: Scalars['Float'];
  vat: Scalars['Float'];
  discount: Scalars['Float'];
  batchId: Scalars['Int'];
};

export type SalePagination = {
  __typename?: 'SalePagination';
  items: Array<Sale>;
  meta: Meta;
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

export type SoftRemoveBatchOutput = {
  __typename?: 'SoftRemoveBatchOutput';
  batch: Batch;
  medicine: Medicine;
};

export type SoftRemoveMedicineOutput = {
  __typename?: 'SoftRemoveMedicineOutput';
  medicine: Medicine;
  article: Article;
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
  out: Array<StockMovement>;
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
  form: MedicineFormInput;
};

export type UpdatePackagingInput = {
  id: Scalars['Int'];
  units: Array<CreatePackagingInput>;
};

export type UpdatePasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UpdatePaymentInput = {
  id: Scalars['Float'];
  form: PaymentFormInput;
};

export type UpdatePrescriptionInput = {
  reference: Scalars['String'];
  description: Scalars['String'];
  patient: CreatePatientInput;
  id: Scalars['Float'];
};

export type UpdateSaleLineInput = {
  quantity: Scalars['Int'];
  price: Scalars['Float'];
  vat: Scalars['Float'];
  discount: Scalars['Float'];
  batchId: Scalars['Int'];
  id: Scalars['Int'];
};

export type UpdateUserInput = {
  username: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  avatar: Scalars['String'];
  password: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};
