import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss'
import App from './App';
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { MetaMaskProvider } from './hooks/useMetaMask'
import Favicon from 'react-favicon';

function getLibrary(provider: any) {
  return new Web3(provider)
}

ReactDOM.render(
  <Web3ReactProvider
    getLibrary={getLibrary}>
    <Favicon url={require('./images/favicon.png')} />
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </Web3ReactProvider>,
  document.getElementById('root')
);
