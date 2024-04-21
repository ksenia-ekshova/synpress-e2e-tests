export default class Buttons {
  static buttonByText = (text: string): string => `//button[text()='${text}']`;
}
