import { useState } from 'react'
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

const contractsAddrs = [
  '0xabc133692c73da43cfcd84c1e742111f2cce6e42',
  '0xf4f43f942d9470623944ac474d022191925b10bc',
  '0xabcfe0bb073905b9716faace4e1fd6e0df125ea0',
  '0xb965ec4baf8afc323e4a941662e052298462d3ee',
  '0xeb7d5eca1836f7e1a4a59e464942bfa5e5f53bf5',
  '0x3d7e4452a4216796220d3a4a060af0c338b7f1c6',
  '0x486e9f921d86a83418c5a816a1d4eccf427604ae'
]

const App = () => {
  const { connect, disconnect, isActive, account, mustChangeChain } = useMetaMask()
  const [contracts,] = useState<string[]>(contractsAddrs)
  const [contract, setContract] = useState<ContractType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [web3, setWeb3] = useState<Web3>(new Web3())
  const [isShortAddr, setIsShortAddr] = useState<boolean>(false)

  const [methods, setMethods] = useState<any>([])
  const [contractAddr, setContractAddr] = useState<string>('')

  useEffect(() => {
    document.title = "CryptoRobotics bridge";
    const web3 = new Web3(config.providers.binance)
    web3.eth.setProvider(Web3.givenProvider);
    setWeb3(web3)
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
      <Template>
        {!(window as any).ethereum && <a href={config.links.download}>Пожалуйста установите Metamask</a>}
      </Template>
    )
  }

  return (
    <Template
      connected={isActive}
      userAddress={account}
      connect={connect}
      disconnect={disconnect}
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
        connected={isActive}
        contract={contract}
        mustChangeChain={mustChangeChain}
      />
      <Styled.Footer>
        © Cryptorobotics. All rights reserved
      </Styled.Footer>
    </Template>
  )
}

export default App
