import { ENSignType } from './sign-type.model';

export interface PdfViewerConfig {
  height: string;
  showBorders: boolean;
  showOpenFileButton: boolean;
  showPrintButton: boolean;
  showBookmarkButton: boolean;
  showDownloadButton: boolean;
  showSecondaryToolbarButton: boolean;
  showRotateButton: boolean;
}

export interface PdfHeaderConfig {
  showTitle: boolean;
  showSignatureWidget: boolean;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export interface ENPdfHeader  {
  pagination: PdfPagination;
  title: string;
  zoom: PdfZoom;
  dossierName: string;
}

export interface PdfActionConfig {
  disableAbort: boolean;
  showAbort: boolean;
  disableReview: boolean;
  showReview: boolean;
  disableSeal: boolean;
  showSeal: boolean;
  disableForward: boolean;
  showForward: boolean;
  disableSign: boolean;
  showSign: boolean;
  showSignType: boolean;
  disableDrawSignature: boolean;
  showDrawSignature: boolean;
  signTypes: ENSignType[];
}

export interface PdfPagination {
  total: number;
  current: number;
}

export interface PdfZoom {
  current: number;
  max: number;
  min: number;
  gap: number;
}
