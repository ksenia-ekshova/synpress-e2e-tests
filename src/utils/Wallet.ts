import { ethers } from 'ethers';

export default class Wallet {
  static async createNewWallet(): Promise<string> {
    try {
      const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
      const newWallet = ethers.Wallet.fromMnemonic(mnemonic);
      console.log('New wallet address:', newWallet.address);
      return newWallet.address;
    } catch (error: any) {
      console.error('Error with creating wallet: ', error.message);
      throw error;
    }
  }
}
