import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMetaMask } from "src/hooks/useMetaMask";
import { Contract as ContractType } from "web3-eth-contract";
import * as Styled from './styles'

interface Props {
  methods?: any[]
  address?: string
  connected: boolean
  name: string
  loading?: boolean
  contract?: ContractType
  mustChangeChain?: boolean
}

export const Contract: React.FC<Props> = ({ name, address, connected, loading, contract, mustChangeChain }) => {
  const { account: from } = useMetaMask()
  const { t } = useTranslation();

  // info
  const [numberOfDeposits, setNumberOfDeposits] = useState<unknown>('0')
  const [activeDeposit, setActiveDeposit] = useState<unknown>(1)

  const [currentStep, setCurrentStep] = useState<string>('1')
  const [tokensOnDeposit, setTokensOnDeposit] = useState<string>('0')
  const [tokensToWithdraw, setTokensToWithdraw] = useState<string>('0')
  const [lostTime, setLostTime] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [steps, setSteps] = useState<number>(6)

  // methods vars
  const [getTokensLoading, setGetTokensLoading] = useState<boolean>(false)
  const [clicked, setClicked] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(true)
  
  useEffect(() => {
    if(connected) {
      contract?.methods.token()
        .call()
          .then((data: string) => setToken(data))

      contract?.methods?.getNumberOfDeposits(from)
        .call()
          .then((data: number) => setNumberOfDeposits(data))

      contract?.methods.numberOfSteps()
        .call()
          .then((data: number) => setSteps(data))

      contract?.methods?.getPayment(activeDeposit)
        .call()
          .then(() => console.log('Done'))
          .catch(() => setTokensOnDeposit("0"))

      contract?.methods?.getUser(from, activeDeposit)
        .call()
          .then((data: number[]) => setTokensToWithdraw((data[1] / 10e18).toString()))
          .catch(() => setTokensToWithdraw('0'))
      
      contract?.methods?.getCurrentStep(from, activeDeposit)
        .call()
          .then((data: number) => setCurrentStep(data.toString()))
          .catch(() => setCurrentStep("0"))
      
      contract?.methods.RELEASE_STEP()
        .call()
          .then((data: number) => {
            const timeDiv = (data * 6) - (data * Number(currentStep))
            const minutes = timeDiv / 60
            const hours = minutes / 60
            const days = hours / 24

          // if(timeDiv < 60) {
          //   setLostTime(`${timeDiv}c.`)
          // }
          // else if (timeDiv >= 60 && minutes < 60) {
          //   setLostTime(`${minutes} мин`)
          // }
          // else if (minutes >= 60 && hours < 24) {
          //   setLostTime(`${hours}ч.`)
          // }
          setLostTime(String(days))
        })
    }
  }, [contract, from, connected, activeDeposit, currentStep])

  const getTokens = async () => {
    setGetTokensLoading(true)

    try {
      await contract?.methods.getTokens(Number(activeDeposit)).send({ from })
      setClicked(true)
      setSuccess(true)
      setGetTokensLoading(false)
    } catch (error) {
      setClicked(true)
      setGetTokensLoading(false)
      setSuccess(false)
    }
  }

  if (mustChangeChain) {
    return (
      <Styled.ContractWrapper empty>
        <h2>
          <Styled.Link
            href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain">
              {t('change')}
          </Styled.Link> {t('net-to-main')}
        </h2>
      </Styled.ContractWrapper>
    )
  }

  if(!connected || !address || address.length < 20) {
    return (
      <Styled.ContractWrapper empty>
        <h2>{t('connect-and-choise')}</h2>
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
      <h3>{t('contract')} { name }: { address }</h3>
      <Styled.Methods>
        <Styled.Method>
          <Styled.MethodName>{t('choised-deposit')}</Styled.MethodName>
          <Styled.MethodBody>
            <Styled.CustomDrop
              values={numberOfDeposits as string}
              value={activeDeposit as string}
              itemClassName='number-item'
              onChoise={(val: any) => setActiveDeposit(val)}
            />
          </Styled.MethodBody>
        </Styled.Method>

        <Styled.Method>
          <Styled.MethodName>{t('token-name')}</Styled.MethodName>
          <Styled.MethodBody>DEROBO</Styled.MethodBody>
        </Styled.Method>

        <Styled.Method>
          <Styled.MethodName>{t('token-contract')}</Styled.MethodName>
          <Styled.MethodBody>{token}</Styled.MethodBody>
        </Styled.Method>

        <Styled.Method>
          <Styled.MethodName>{t('total-steps')}</Styled.MethodName>
          <Styled.MethodBody>{steps}</Styled.MethodBody>
        </Styled.Method>

        <Styled.Method>
          <Styled.MethodName>{t('current-stage')}</Styled.MethodName>
          <Styled.MethodBody>
            {Number(currentStep) === 6 ? t('stages-completed') : currentStep}
          </Styled.MethodBody>
        </Styled.Method>
        {Number(currentStep) < 6 && (
          <Styled.Method>
            <Styled.MethodName>{t('until-next-stage')}</Styled.MethodName>
            <Styled.MethodBody>{lostTime}</Styled.MethodBody>
          </Styled.Method>
        )}
        <Styled.Method>
          <Styled.MethodName>{t('token-on-deposit')}</Styled.MethodName>
          <Styled.MethodBody>{tokensOnDeposit}</Styled.MethodBody>
        </Styled.Method>
        <Styled.Method>
          <Styled.MethodName>{t('available-tokens')}</Styled.MethodName>
          <Styled.MethodBody>{tokensToWithdraw}</Styled.MethodBody>
        </Styled.Method>

      <Styled.MethodGet>
        <Styled.LoadingGroup>
          <Styled.MethodButton onClick={getTokens}>
            {t('get-coins')}
          </Styled.MethodButton>
          <Styled.Message>
            {clicked ? 
              (success ? `${t('successufuly-send')} ${from}` : <Styled.Error>{t('enough-funds')}</Styled.Error>) : ''}
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