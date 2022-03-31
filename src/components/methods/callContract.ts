import { Contract } from "web3-eth-contract";
import tokenAbi from 'src/abi/token.json'
import Web3 from "web3";

const describes: any = {
  tokenName: 'Название токена',
  tokenContract: 'Контракт токена',
  totalSteps: 'Общее количество этапов',
  dayToNextStep: 'Дней до следующего этапа',
  valueOfTokens: 'Количество токенов на депозите',
  valueOfTokensWithdraw: 'Количество доступных токенов к получению',
  currentStep: 'Текущий этап'
}

export const callContract = async (contract: Contract, web3: Web3) => {
  const tokenAddress = await contract.methods.token().call()
  const tokenContract = new web3.eth.Contract((tokenAbi as any), tokenAddress)
  if(contract) {
    return [
      {
        describe: describes.tokenName,
        value: await tokenContract.methods.symbol().call()
      },
      {
        describe: describes.tokenContract,
        value: tokenAddress
      },
      {
        describe: describes.totalSteps,
        value: await contract.methods.numberOfSteps().call()
      },
    ].filter(Boolean)
  }
  return []
}