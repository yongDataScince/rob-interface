export const config = {
  /**
   * Ethereum Chain Id (1 form Mainnet)
   */
  chain: 3,

  /**
   * Signature message
   */
  message: "Approve your swap to BNB wallet:\n",

  /**
   * Web3 providers urls
   */
  providers: {
    ethereum: 'https://ropsten.infura.io/v3/68526968f67442abbcf82b80c7a382fb',
    binance: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
  },

  /**
   * Smart contracts addresses
   */
  contracts: {
    sender: '0xA3f73d60e05e71DC2AA01C17234A41BFd3f44a6e',
    receiver: '0xA59B1152d6b0ecE346bB0314148bc1da26a7fBc6',
  },

  /**
   * Possibly mutable links
   */
  links: {
    download: 'https://metamask.io/download/',
    support: 'https://t.me/thisnspo',
    etherscan: 'https://ropsten.etherscan.io/tx/',
    bscscan: 'https://testnet.bscscan.com/token/',
  }
}
