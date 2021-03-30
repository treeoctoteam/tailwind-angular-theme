export interface ENDocumentField {
  description: string;
  mandatory: boolean;
  fieldName: string;
  pageNumber: number;
  parentName: string;
  priority: number;
  signed: boolean;
  signTime: number;
  status: string;
  type: string;
  isEdited: boolean;
  backgroundImage: string;
  dimensions: ElementDimension;
}

export interface ElementDimension {
  w: number;
  h: number;
  x: number;
  y: number;
}

export type CanvasActions = 'freeHand' | 'Image' | 'Field';

