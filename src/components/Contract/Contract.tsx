import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMetaMask } from "src/hooks/useMetaMask";
import { Contract as ContractType } from "web3-eth-contract";
import * as Styled from './styles'

interface Props {
  methods?: any[]
  address?: string
  connected: boolean
  loading?: boolean
  contract?: ContractType
}

export const Contract: React.FC<Props> = ({ methods, address, connected, loading, contract }) => {
  const { account: from, provider } = useMetaMask()

  // info
  const [numberOfDeposits, setNumberOfDeposits] = useState<unknown>('0')
  const [activeDeposit, setActiveDeposit] = useState<unknown>(1)

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [tokensOnDeposit, setTokensOnDeposit] = useState<number>(0)
  const [tokensToWithdraw, setTokensToWithdraw] = useState<number>(0)

  // methods vars
  const [getTokensLoading, setGetTokensLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [clicked, setClicked] = useState<boolean>(false)


  useEffect(() => {
    contract?.methods?.getNumberOfDeposits(from)
      .call()
        .then((data: number) => setNumberOfDeposits(data))

    contract?.methods?.getPayment(activeDeposit)
      .call()
        .then((data: number) => setTokensOnDeposit(data))
        .catch(() => setTokensOnDeposit(0))

    contract?.methods?.getUser(from, activeDeposit)
      .call()
        .then((data: number[]) => setTokensToWithdraw(data[1] / 10e18))
    
    contract?.methods?.getCurrentStep(from, activeDeposit)
      .call()
        .then((data: number) => setCurrentStep(data))
  }, [contract, from, activeDeposit])

  const getTokens = async () => {
    console.log(from, provider);
    setGetTokensLoading(true)
    setMessage('')
    setClicked(true)
    try {
      await contract?.methods.getTokens(Number(activeDeposit)).send({ from })
      setMessage(`Ваши токены были успешно отправлены на кошелек <a>${from}</a>`)
      setGetTokensLoading(false)
    } catch (error) {
      setGetTokensLoading(false)
      setMessage(`Ваши токены не были отправлены на кошелек тк у вас не достаточно средств`)
      console.log(error);
    }
  }

  if(!connected || !address) {
    return (
      <Styled.ContractWrapper empty>
        <h2>Подключи кошелек и выбери нужный контракт</h2>
      </Styled.ContractWrapper>
    )
  }

  if(loading) {
    return (
      <Styled.ContractWrapper>
        <Styled.LoadingWrapper>
          <Styled.LoadingItem />
        </Styled.LoadingWrapper>
      </Styled.ContractWrapper>
    )
  }
  
  return (
    <Styled.ContractWrapper>
      <h3>Контракт: { address } </h3>
      <Styled.Methods>
        <Styled.Method>
          <Styled.MethodName>Выбранный депозит</Styled.MethodName>
          <Styled.MethodBody>
            <Styled.CustomDrop
              values={numberOfDeposits as string}
              value={activeDeposit as string}
              itemClassName='number-item'
              onChoise={(val: any) => setActiveDeposit(val)}
            />
          </Styled.MethodBody>
        </Styled.Method>
        {
          methods?.map((m: any, index: number) => (
            <Styled.Method key={index}>
              <Styled.MethodName>{m.describe || m.name}</Styled.MethodName>
              <Styled.MethodBody>
                {m.value}
              </Styled.MethodBody>
            </Styled.Method>
          ))
        }
        <Styled.Method>
          <Styled.MethodName>Текущий этап</Styled.MethodName>
          <Styled.MethodBody>{currentStep}</Styled.MethodBody>
        </Styled.Method>
        <Styled.Method>
          <Styled.MethodName>Количество токенов на депозите</Styled.MethodName>
          <Styled.MethodBody>{tokensOnDeposit}</Styled.MethodBody>
        </Styled.Method>
        <Styled.Method>
          <Styled.MethodName>Количество доступных токенов к получению</Styled.MethodName>
          <Styled.MethodBody>{tokensToWithdraw}</Styled.MethodBody>
        </Styled.Method>

      <Styled.MethodGet>
        <Styled.LoadingGroup>
          <Styled.MethodButton onClick={getTokens}>
            Get Tokens
          </Styled.MethodButton>
          <Styled.Message>
            {clicked ? message : ''}
          </Styled.Message>
          {getTokensLoading && (
            <Styled.LoadingTransactionWrapper>
              <Styled.LoadingItemLittle />
            </Styled.LoadingTransactionWrapper>
          )}
        </Styled.LoadingGroup>
      </Styled.MethodGet>
      </Styled.Methods>
    </Styled.ContractWrapper>
  )
}