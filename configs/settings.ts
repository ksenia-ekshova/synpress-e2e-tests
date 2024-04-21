import { NETWORKS } from '../configs/networks';

export const SETTINGS = {
  PARAMETERS: {
    secretWordsOrPrivateKey: process.env.METAMASK_SECRET_WORDS || process.env.PRIVATE_KEY,
    password: process.env.METAMASK_PASSWORD || '1234567890',
    enableAdvancedSettings: true,
    enableExperimentalSettings: false,
    network: NETWORKS.MUMBAI2.network,
  },
};
