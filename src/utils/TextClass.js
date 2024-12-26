import textStrings from './text_en';

class TextClass {
  constructor() {
    this.locale = navigator.language || 'en'; 
    this.textStrings = textStrings;
    this.isLoaded = true; 
  }

  getTextString(textCode) {
    return this.textStrings[textCode] || "Unknown text string";
  }
}

let textClassInstance = null;

export const getTextClassInstance = () => {
  if (!textClassInstance) {
    textClassInstance = new TextClass();
  }
  return textClassInstance;
};