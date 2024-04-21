export default class Generator {
  static collectionNameGenerator(): string {
    return 'Test name' + Math.floor(Math.random() * 1000);
  }

  static generateRandomSingleDigitNumber(): string {
    return Math.floor(Math.random() * 10).toString();
  }
}
