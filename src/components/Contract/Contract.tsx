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
  const { account: from } = useMetaMask()

  // info
  const [numberOfDeposits, setNumberOfDeposits] = useState<unknown>('0')
  const [activeDeposit, setActiveDeposit] = useState<unknown>(1)

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [tokensOnDeposit, setTokensOnDeposit] = useState<number>(0)
  const [tokensToWithdraw, setTokensToWithdraw] = useState<number>(0)
  const [lostTime, setLostTime] = useState<string>('')

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
    
    contract?.methods.RELEASE_STEP()
      .call()
        .then((data: number) => {
          const timeDiv = (data * 6) - (data * currentStep)
          const minutes = timeDiv / 60
          const hours = minutes / 60
          const days = hours / 24

          if(timeDiv < 60) {
            setLostTime(`${timeDiv}c.`)
          }
          else if (timeDiv >= 60 && minutes < 60) {
            setLostTime(`${minutes} мин`)
          }
          else if (minutes >= 60 && hours < 24) {
            setLostTime(`${hours}ч.`)
          }
          else {
            setLostTime(`${days}дн.`)
          }
        })
  }, [contract, from, activeDeposit, currentStep])

  const getTokens = async () => {
    setGetTokensLoading(true)
    setMessage('')
    setClicked(true)
    try {
      await contract?.methods.getTokens(Number(activeDeposit)).send({ from })
      setMessage(`Ваши токены были успешно отправлены на кошелек ${from}`)
      setGetTokensLoading(false)
    } catch (error) {
      setGetTokensLoading(false)
      setMessage(`Ваши токены не были отправлены на кошелек тк у вас не достаточно средств`)
      console.log(error);
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(methods?.[1].value || '')
  }

  if(!connected || !address || address.length < 20) {
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
          <Styled.MethodBody>
            {Number(currentStep) === 6 ? 'Все этапы завершены' : currentStep}
          </Styled.MethodBody>
        </Styled.Method>
        <Styled.Method>
          <Styled.MethodName>Общее количество этапов</Styled.MethodName>
          <Styled.MethodBody>6</Styled.MethodBody>
        </Styled.Method>
        {currentStep < 6 && (
          <Styled.Method>
            <Styled.MethodName>До следующего этапа</Styled.MethodName>
            <Styled.MethodBody>{lostTime}</Styled.MethodBody>
          </Styled.Method>
        )}
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