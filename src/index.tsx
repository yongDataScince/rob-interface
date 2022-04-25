import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss'
import App from './App';
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { MetaMaskProvider } from './hooks/useMetaMask'
import Favicon from 'react-favicon';
import './i18n';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// const base = '/:locale(en|ru)?';

function getLibrary(provider: any) {
  return new Web3(provider)
}

ReactDOM.render(
  <Web3ReactProvider
    getLibrary={getLibrary}>
    <Favicon url={require('./images/favicon.png')} />
    <MetaMaskProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate replace to="/ru" />} />
          <Route path='/ru' element={<App lang="ru" />} />
          <Route path='/en' element={<App lang="en" />} />
        </Routes>
      </Router>
    </MetaMaskProvider>
  </Web3ReactProvider>,
  document.getElementById('root')
);
