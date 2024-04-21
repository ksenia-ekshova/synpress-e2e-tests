# NFT Collection e2e test examples with Synpress

This project contains an example of test framework for e2e testing of a smart contract for creating an NFT collection and an NFT mint on the Polygon Mumbai testnet.

- Based on Playwright and [Synpress](https://github.com/Synthetixio/synpress) as plugin for working with metamask extension
- Code style with ESLint and Prettier 
- GitHub CI Actions
- Preconditions: creating a new wallet for NFT recipient (with ethers.js)
- Report is generated with every test run

## Local installation

- Make sure you have Node.js and npm installed [Node.js and npm download link](https://nodejs.org/en/download/).
- Make sure you have correct wersion of chromium or use command:
```bash
    npx playwright install chromium
```

1. Clone the repository and install dependencies using npm:

```bash
    git clone https://github.com/ksenia-ekshova/synpress-e2e-tests.git
    cd synpress-e2e-tests
```

2. Install dependencies:

```bash
    npm install
```

3. Deploy Frontend and Backeng images of Test Application with Docker using the following commands:

```bash
    docker pull evercoinx/faraway:nft-collection-deployer-frontend
    docker pull evercoinx/faraway:nft-collection-deployer-backend
```

2. Check the pulled images with:

```bash
    docker images
```

3. Run the containers. Replace <Backend Image ID> and <Frontend Image ID> with the respective values got from the previous step.

```bash
    docker run -p 4000:4000 <Backend Image ID>
    docker run -p 3000:3000 <Frontend Image ID>
```

3. Fill .env file with your data (METAMASK_SECRET_WORDS or PRIVATE_KEY are manadaroty)

4. Run tests:

```bash
    npm test
```
- headless mode:
add 'HEADLESS_MODE=1' to .env

- debug mode:

```bash
    npm test:debug
```

5. Generate report:

```bash
    npx playwright show-report
```

## Task

Smart contract on the Polygon Mumbai EVM chain (address: 0x54eede47850fe932f5466b6fa708bf1176371966) for creating NFT collections and NFTs in them.
A backend application that tracks contract events (item 1) on the blockchain, stores them in memory and provides access via an API. Image: evercoinx/faraway:nft-collection-deployer-backend. It is important to note that only events that occurred after the backend application was launched are available.
A client application (evercoinx/faraway:nft-collection-deployer-frontend image) interacting with a smart contract (creating and sending transactions) and a backend application (receiving and displaying events).
https://mumbai.polygonscan.com/address/0x54EEDe47850fE932f5466B6fa708bf1176371966

- Cases for testing
  Creating a collection: when the form is filled out correctly and the transaction is sent, a new event is expected to be output containing data from the form, as well as the address of the created collection in the application interface.
  NFT creation: if the form data is filled out correctly, the successful creation of an NFT in the selected collection is expected and an event about this is displayed in the application interface.

- Requirements for the solution
  The solution must be submitted as a project on GitHub with a configured action for manual execution. The addresses of the images must be included in the action parameters for verification.

## Github Actions

The project is configured to use Github Actions. The configuration file is `.github/workflows/actions.yml`
Environment variables are set via Secrets
Image for Manual workflow sets via Githun Actions => Manual Workflow => Run Workflow

## Static Code Analysis

1. Run manually:
```bash
    npm run eslint
    npm run prettier
```
2. Automatic check on every commit
