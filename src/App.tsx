import React, { useState } from 'react'
import abi from './abi/abi.json'
import { config } from './config'
import Template from './components/Template'
import DropDown from './components/DropDown'
import { useMetaMask } from './hooks/useMetaMask'
import Contract from './components/Contract'
import { Contract as Contr } from 'web3-eth-contract'
import Web3 from 'web3'
import { callContract } from './components/methods/callContract'
import { Contract as ContractType } from 'web3-eth-contract'
import { useEffect } from 'react'
import * as Styled from './app-styles'
import { useTranslation } from 'react-i18next'

export interface ContractItem {
  name: string
  address: string
}

interface Props {
  lang: string
}

const contractsAddrs = [
  {address: '0xabc133692c73da43cfcd84c1e742111f2cce6e42', name: 'Swap Vesting'},
  {address: '0xf4f43f942d9470623944ac474d022191925b10bc', name: 'Private Sale / Funds Vesting'},
  {address: '0xabcfe0bb073905b9716faace4e1fd6e0df125ea0', name: 'Private Sale / Infl Vesting'},
  {address: '0xb965ec4baf8afc323e4a941662e052298462d3ee', name: 'Public Sale Vesting'},
  {address: '0xeb7d5eca1836f7e1a4a59e464942bfa5e5f53bf5', name: 'Team Vesting'},
  {address: '0x3d7e4452a4216796220d3a4a060af0c338b7f1c6', name: 'Partnerships Vesting'},
  {address: '0x486e9f921d86a83418c5a816a1d4eccf427604ae', name: 'Advisors, Legal&Tax Vesting'},
]

const App: React.FC<Props> = ({ lang }) => {
  const { connect, disconnect, setIsActive, isActive, account, mustChangeChain } = useMetaMask()
  const { t, i18n } = useTranslation()
  const [contracts] = useState<ContractItem[]>(contractsAddrs)
  const [contract, setContract] = useState<ContractType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [web3, setWeb3] = useState<Web3>(new Web3())
  const [isShortAddr, setIsShortAddr] = useState<boolean>(false)

  const [methods, setMethods] = useState<any>([])
  const [contractAddr, setContractAddr] = useState<string>('')

  const disconnectAll = async () => {
    setIsActive(false)
    await disconnect()
  }

  useEffect(() => {
    document.title = "CryptoRobotics bridge";
    const web3 = new Web3(config.providers.binance)
    web3.eth.setProvider(Web3.givenProvider);
    setWeb3(web3)
    i18n.changeLanguage(lang)
  }, []);

  const loadContract = async (address: unknown) => {
    if ((address as string).length < 20) {
      setIsShortAddr(true)
      return
    }
    setIsShortAddr(false)
    setLoading(true)
    setContractAddr(address as string)

    const contract: Contr = new web3.eth.Contract((abi as any), address as string)
    setContract(contract)

    const methodsData = await callContract(contract, web3)
    setMethods(methodsData)
    setLoading(false)
  }

  if (!(window as any).ethereum) {
    return (
      <Template lang={lang}>
        {!(window as any).ethereum && <a href={config.links.download}>{t('please-install')}</a>}
      </Template>
    )
  }

  return (
    <Template
      lang={lang}
      connected={isActive}
      userAddress={account}
      connect={connect}
      disconnect={disconnectAll}
    >
      <DropDown
        isShortAddr={isShortAddr}
        disabled={!isActive}
        values={contracts}
        value={contractAddr}
        onChange={(e) => setContractAddr(e.target.value)}
        onChoise={loadContract}
        onKeyPress={loadContract}
      />
      <Contract
        loading={loading}
        methods={methods}
        address={contractAddr}
        name={contractsAddrs.filter(i => i.address === contractAddr).map(i => i.name)[0]}
        connected={isActive}
        contract={contract}
        mustChangeChain={mustChangeChain}
      />
      <Styled.Footer>
        © Cryptorobotics. {t('reserved')}
      </Styled.Footer>
    </Template>
  )
}

export default App
