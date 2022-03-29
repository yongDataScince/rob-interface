import { Contract } from "web3-eth-contract";
import abi from 'src/abi/abi.json'

export const callContract = async (contract: Contract) => {
  if(contract) {
    const viewNoArgsMethods = await Promise.all(Object.keys(contract.methods)
    .filter((name) => !name.includes('()'))
    .filter((name) => !name.includes('0x'))
    .map(async (name) => {
      return abi
        .filter((obj) => name.includes(obj.name || ''))
        .filter((obj) => obj.stateMutability === 'view')
        .filter((obj) => !obj.inputs.length)
        .map(async (obj) => {
          return {
            name: obj.name,
            value: await contract.methods[name]().call(),
            returns:
              obj.outputs?.map(outs => ({ typeName: outs.type, name: outs.name }))
          }
        })?.[0]
    }))

    const viewArgsMethods = Object.keys(contract.methods)
      .filter((name) => !name.includes('(') && !name.includes(')') )
      .map((name) => {
        return abi
          .filter((obj) => name.includes(obj.name || ''))
          .filter((obj) => obj.stateMutability === 'view')
          .filter((obj) => obj.inputs.length)
          .map((obj) => ({
            name: obj.name,
            params:
              obj.inputs.map(inps => ({ typeName: inps.type, name: inps.name })),
            returns: 
              obj.outputs?.map(outs => ({ typeName: outs.type, name: outs.name }))
          }))?.[0]
      })

    return [
      ...viewArgsMethods,
      ...viewNoArgsMethods
    ].filter(Boolean)
  }
  return []
}