export interface IAppConfig {
  params: IParams;
  network: INetwork;
  ui: IUi;
  origins: IOrigin[];
}
export interface IOrigin {
  name: string;
  url: string;
}

export interface IParams {
  enviroment: string;
  customer: string;
  project: string;
  workflow: string;
}

export interface INetwork {
  host: string;
  basePath: string;
  hostApi: string;
  hostApiV1: string;
  hostApiV2: string;
  hostApiV3: string;
  openViduServerUrl: string;
}

export interface IUi {
  customerStartPage: string;
  operatorStartPage: string;
  adminStartPage: string;
  disableAdministration: boolean;
  disableOperator: boolean;
  disableAgent: boolean;
  disableCustomer: boolean;
  title: string;
  favicon: string;
  theme: string;
  uploader: IUpploader;
  documents: IDocuments;
  additionalDocument: IAdditionalDocuments;
  selfie: ISelfie;
  personalData: IPersonalData;
  formA: IFormA;
  formK: IFormK;
  certificatePinOtp: ICertificatePinOtp;
  welcomeLogin: {
    twoFactorEnabled: boolean;
  }
  navigation: {
    showCallcenter: boolean,
    showGenerateCR: boolean,
    showAudit: boolean,
    showManagerCR: boolean,
    showLiveness: boolean,
    showLivenessConfigurator: boolean,
    showPolicyConfigurator: boolean,
    showTenantsConfigurator: boolean,
    showLogout: boolean,
    showBillingCertificate: boolean,
  }
  navbar: {
    logoPath: string;
    logoPathOperator: string;
    logoCheckOrigin: boolean;
    hidden: boolean;
    showOpStatus: boolean;
  };
  footer: {
    message: string;
    hidden: boolean;
    links: ILink[];
  };
  languages: ILanguage[],
}
export interface ICertificatePinOtp {
  releaseNebulaCertificate: boolean;
}
export interface IDocuments {
  disableCountry: boolean;
  retrieveFormType: boolean;
  enableFixOcr: boolean;
  enableNebulaCheckUserFixOcr: boolean;
  enableUploadNieFixOcr: boolean;
  enableUploadTinCodeFixOcr: boolean
}
export interface IAdditionalDocuments {
  multipleFIles: boolean;
}
export interface ISelfie {
  requireFaceMatch: boolean;
}
export interface ILanguage {
  id: string,
  title: string,
  flag: string,
  iso3code: string,
  enabled: boolean,
}
export interface ILink {
  class: string;
  href: string;
  text: string;
  hidden: boolean;
}

export interface IUpploader {
  showUploadFromFile: boolean;
  validate_ocr: boolean;
}
export interface IPersonalData {
  retrieveFormType: boolean;
  email_disabled: boolean;
  firstName_Required: boolean;
  firstName_Disabled: boolean;
  lastName_Required: boolean;
  lastName_Disabled: boolean;
  stateBorn_Required: boolean;
  provinceOfBorn_Required: boolean;
  cityOfBorn_Required: boolean;
  placeOfResidence_Required: boolean;
  streetName_Required: boolean;
  streetNumber_Required: boolean;
  floor_Required: boolean;
  unit_Required: boolean;
  district_Required: boolean;
  zipcode_Required: boolean;
  countryResidential_Required: boolean;
  provinceResidential_Required: boolean;
  cityResidential_Required: boolean;
  birthDate_Required: boolean;
  citizenship_Required: boolean;
  tinCode_Required: boolean;
  tinCode_Disabled: boolean;
  foreignIdentificationNumber_Required: boolean;
  foreignIdentificationNumber_Disabled: boolean;
  foreignIdentificationNumber_Hidden: boolean;
  gender_Required: boolean;
  email_Required: boolean;
  confirmEmail_Required: boolean;
  prefixNumber_Required: boolean;
  prefixNumber_Hidden: boolean;
  prefixNumber_Default: string;
  phoneNumber_Disabled: boolean;
  phoneNumber_Required: boolean;
  fullPhoneNumber_Disabled: boolean;
  fullPhoneNumber_Required: boolean;
  documentType_Required: boolean;
  documentNumber_Disabled: boolean;
  documentNumber_Required: boolean;
  documentIssuingCountry_Required: boolean;
  documentProvinceOfIssue_Required: boolean;
  documentPlaceOfIssue_Required: boolean;
  documentIssuingDate_Required: boolean;
  documentExpiregDate_Required: boolean;
}

export interface IFormA {
  contractor_firstName_Required: true,
  contractor_lastName_Required: true,
  contractor_streetName_Required: true,
  contractor_streetNumber_Required: true,
  contractor_floor_Required: false,
  contractor_unit_Required: false,
  contractor_district_Required: false,
  contractor_zipcode_Required: true,
  contractor_countryDomicile_Required: true,
  contractor_provinceDomicile_Required: true,
  contractor_cityDomicile_Required: true,
  firstName_Required: boolean;
  lastName_Required: boolean;
  stateBorn_Required: boolean;
  placeOfDomicile_Required: boolean;
  streetName_Required: boolean;
  streetNumber_Required: boolean;
  floor_Required: boolean;
  unit_Required: boolean;
  district_Required: boolean;
  zipcode_Required: boolean;
  countryDomicile_Required: boolean;
  provinceDomicile_Required: boolean;
  cityDomicile_Required: boolean;
  birthDate_Required: boolean;
  nationality_Required: boolean;
}

export interface IFormK {
  contractor_businessName_Required: true,
  contractor_streetName_Required: true,
  contractor_streetNumber_Required: true,
  contractor_floor_Required: false,
  contractor_unit_Required: false,
  contractor_district_Required: false,
  contractor_zipcode_Required: true,
  contractor_countryDomicile_Required: true,
  contractor_provinceDomicile_Required: true,
  contractor_cityDomicile_Required: true,
  contractor_Required: boolean;
  firstName_Required: boolean;
  lastName_Required: boolean;
  stateBorn_Required: boolean;
  placeOfDomicile_Required: boolean;
  streetName_Required: boolean;
  streetNumber_Required: boolean;
  floor_Required: boolean,
  unit_Required: boolean,
  district_Required: boolean,
  zipcode_Required: boolean;
  countryDomicile_Required: boolean;
  provinceDomicile_Required: boolean;
  cityDomicile_Required: boolean;
  aml_Required: boolean;
  fiduciary_Required: boolean
}

export interface ILink {
  key: string;
  value: string;
  enabled: boolean;
}
