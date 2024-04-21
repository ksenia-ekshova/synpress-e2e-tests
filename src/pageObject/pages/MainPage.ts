import { type Page, expect } from '@playwright/test';
import { Buttons, Inputs } from '../components';

export default class MainPage {
  private static readonly eventList = (text: string): string =>
    `//*[contains(@class, "list-group-item") and contains(text(), "${text}")]`;
  createCollectionEventHeader = 'Collection Created with address: ';
  mintNFTEventHeader = 'NFT minted for collection: ';

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillCollectionName(value: string): Promise<void> {
    await this.page.locator(Inputs.inputByPlaceholder('Enter collection name')).fill(value);
  }

  async fillCollectionSymbol(value: string): Promise<void> {
    await this.page.locator(Inputs.inputByPlaceholder('Enter collection symbol')).fill(value);
  }

  async fillCollectionTokenURI(value: string): Promise<void> {
    await this.page.locator(Inputs.inputByPlaceholder('Enter collection token URI')).fill(value);
  }

  async fillCollectionAddress(value: string): Promise<void> {
    await this.page.locator(Inputs.inputByPlaceholder('Enter collection address')).fill(value);
  }

  async fillRecipientAddress(value: string): Promise<void> {
    await this.page.locator(Inputs.inputByPlaceholder('Enter recipient address')).fill(value);
  }

  async fillTokenId(value: string): Promise<void> {
    await this.page.locator(Inputs.inputByPlaceholder('Enter token id')).fill(value);
  }

  async clickToCreateButton(): Promise<void> {
    await this.page.locator(Buttons.buttonByText('Create')).click();
  }

  async clickToMintButton(): Promise<void> {
    await this.page.locator(Buttons.buttonByText('Mint')).click();
  }

  async getCollectionAddressFromEvent(): Promise<string> {
    const text = await this.page.locator(MainPage.eventList(this.createCollectionEventHeader)).innerText();
    const addressStart = text.indexOf('0x');
    const address = text.substring(addressStart, addressStart + 42);
    console.log(`Collection address from event: ${address}`);
    return address;
  }

  async checkCollectionCreatedEvent(): Promise<void> {
    await expect(this.page.locator(MainPage.eventList(this.createCollectionEventHeader))).toBeVisible();
  }

  async checkTokenMintedEvent(collectionAddress: string): Promise<void> {
    await expect(this.page.locator(MainPage.eventList(this.mintNFTEventHeader))).toContainText(collectionAddress);
  }

  async checkCollectionNameInEvent(name: string): Promise<void> {
    await expect(this.page.locator(MainPage.eventList(this.createCollectionEventHeader))).toContainText(
      `name: ${name}`,
    );
  }

  async checkCollectionSymbolInEvent(symbol: string): Promise<void> {
    await expect(this.page.locator(MainPage.eventList(this.createCollectionEventHeader))).toContainText(
      `symbol: ${symbol}`,
    );
  }

  async checkCollectionAddressInEvent(address: string): Promise<void> {
    await expect(this.page.locator(MainPage.eventList(this.mintNFTEventHeader))).toContainText(`address: ${address}`);
  }

  async checkRecipientAddressInEvent(address: string): Promise<void> {
    await expect(this.page.locator(MainPage.eventList(this.mintNFTEventHeader))).toContainText(`to: ${address}`);
  }

  async checkTokenIdInEvent(id: string): Promise<void> {
    await expect(this.page.locator(MainPage.eventList(this.mintNFTEventHeader))).toContainText(`token id: ${id}`);
  }

  async checkTokenURIInEvent(URI: string): Promise<void> {
    await expect(this.page.locator(MainPage.eventList(this.mintNFTEventHeader))).toContainText(`token URI: ${URI}`);
  }
}
