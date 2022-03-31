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
import { Contract as ContractType } from "web3-eth-contract";
import { useEffect } from 'react'

const contractsAddrs = [
  '0x4B3F1B8C1d27A6F1b7A3b39c16C9b780C2bDdAC1',
  '0xc288dB2eEfff5126544c2636AAF00732C2FdBF45'
]

const App = () => {
  const { connect, disconnect, isActive, account } = useMetaMask()
  const [contracts, setContracts] = useState<string[]>(contractsAddrs)
  const [contract, setContract] = useState<ContractType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [netName, setNetName] = useState<string>('')
  const [web3, setWeb3] = useState<Web3>(new Web3())

  const [methods, setMethods] = useState<any>([])
  const [contractAddr, setContractAddr] = useState<string>('')

  useEffect(() => {
    document.title = "CryptoRobotics bridge";
    const web3 = new Web3(config.providers.binance)
    web3.eth.setProvider(Web3.givenProvider);
    setWeb3(web3)
    web3?.eth.net.getNetworkType().then(setNetName)
  }, []);

  const loadContract = async (address: string | number) => {
    console.log('Load Contract...');
    setLoading(true)
    setContractAddr(address as string)

    const nn = await web3?.eth.net.getNetworkType()
    console.log(nn);

    const contract: Contr = new web3.eth.Contract((abi as any), address as string)
    setContract(contract)

    const methodsData = await callContract(contract, web3)
    setMethods(methodsData)
    setLoading(false)
  }

  const changeAddr = (e: string) => {
    if (!e) {
      console.log('empty');
      setContracts(contractsAddrs)
    }
    setContractAddr(e)
    setContracts(contracts.filter(c => c.toLowerCase().includes(e.toLowerCase())))
  }


  if (!(window as any).ethereum) {
    return (
      <Template>
        {!(window as any).ethereum && <a href={config.links.download}>Please install metamask</a>}
      </Template>
    )
  }

  return (
    <Template
      connected={isActive}
      userAddress={account}
      connect={connect}
      disconnect={disconnect}
      netName={netName}
    >
      <DropDown
        disabled={!isActive}
        values={contracts}
        value={contractAddr}
        onChange={(e) => changeAddr(e.target.value)}
        onChoise={loadContract}
      />
      <Contract
        loading={loading}
        methods={methods}
        address={contractAddr}
        connected={isActive}
        contract={contract}
      />
    </Template>
  )
}

export default App
