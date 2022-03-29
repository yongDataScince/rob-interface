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

const contractsAddrs = [
  '0x4B3F1B8C1d27A6F1b7A3b39c16C9b780C2bDdAC1',
  '0xc288dB2eEfff5126544c2636AAF00732C2FdBF45',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  '0x6b4BAd3D7D5d084b8b6CCEdeC2dcA29501195698'
]

const App = () => {
  const { connect, disconnect, isActive, account } = useMetaMask()
  const [contracts, setContracts] = useState<string[]>(contractsAddrs)
  const [contract, setContract] = useState<ContractType>()
  const [loading, setLoading] = useState<boolean>(false)

  const [methods, setMethods] = useState<any>([])
  const [contractAddr, setContractAddr] = useState<string>('')

  const loadContract = async (address: string) => {
    console.log('Load Contract...');
    setLoading(true)
    setContractAddr(address)

    const web3 = new Web3(config.providers.binance)

    const contract: Contr = new web3.eth.Contract((abi as any), address)
    setContract(contract)

    const methodsData = await callContract(contract)
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
        {!(window as any).ethereum && <a href={config.links.download}>Установи метамаск</a>}
      </Template>
    )
  }

  return (
    <Template connected={isActive} userAddress={account} connect={connect} disconnect={disconnect}>
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
