import { test } from '../fixtures';
import * as metamask from '@synthetixio/synpress/commands/metamask';
import testData from '../../configs/testData';
import { Wallet, Generator } from '../utils';
import MainPage from '../pageObject/pages/MainPage';

let collectionAddress: string;
let recipient: string;
let tokenId: string;
let collectionName: string;
const collectionSymbol = testData.testSymbol;
const URI = testData.pixelCatsURI;

let mainPage: MainPage;

test.beforeAll(async ({}) => {
  recipient = await Wallet.createNewWallet();
  tokenId = Generator.generateRandomSingleDigitNumber();
  console.log('tokenId:', tokenId);
  collectionName = Generator.collectionNameGenerator();
  console.log('collectionName:', collectionName);
});

test.beforeEach(async ({ page }: { page: any }) => {
  await page.goto('/');
  await metamask.acceptAccess();
  mainPage = new MainPage(page);
});

test('Create collection', async ({}) => {
  await mainPage.fillCollectionName(collectionName);
  await mainPage.fillCollectionSymbol(collectionSymbol);
  await mainPage.fillCollectionTokenURI(URI);
  await mainPage.clickToCreateButton();
  // await metamask.confirmTransaction();

  // collectionAddress = await mainPage.getCollectionAddressFromEvent(); // only for isolated tests

  // await mainPage.checkCollectionCreatedEvent();
  // await mainPage.checkCollectionNameInEvent(collectionName);
  // await mainPage.checkCollectionSymbolInEvent(collectionSymbol);
});

test('Mint NFT', async () => {
  await mainPage.fillCollectionAddress(collectionAddress);
  await mainPage.fillRecipientAddress(recipient);
  await mainPage.fillTokenId(tokenId);
  await mainPage.clickToMintButton();

  // await metamask.confirmTransaction();

  // await mainPage.checkTokenMintedEvent(collectionAddress);
  // await mainPage.checkRecipientAddressInEvent(recipient);
  // await mainPage.checkTokenIdInEvent(tokenId);
  // await mainPage.checkTokenURIInEvent(URI);
});
