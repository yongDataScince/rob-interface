import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss'
import App from './App';
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { MetaMaskProvider } from './hooks/useMetaMask'

function getLibrary(provider: any) {
  return new Web3(provider)
}

ReactDOM.render(
  <Web3ReactProvider
    getLibrary={getLibrary}>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </Web3ReactProvider>,
  document.getElementById('root')
);
