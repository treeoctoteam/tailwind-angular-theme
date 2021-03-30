import { ElementDimension } from "../models/document-fields.model"

export const fileToBase64 = (file: File, withPrefix = false): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const dataUrl = reader.result as string;
    resolve(withPrefix ? dataUrl.split(',')[1] : dataUrl);
  }
  reader.onerror = error => reject(error);
});

export const getElementDimensions = (element: HTMLElement): ElementDimension => {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    w: element.getBoundingClientRect().width,
    h: element.getBoundingClientRect().height
  }
}
