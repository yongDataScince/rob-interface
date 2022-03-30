import React from "react";
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

interface InpOut {
  name?: string,
  typeName?: string,
  values?: any
}
export const Contract: React.FC<Props> = ({ methods, address, connected, loading, contract }) => {
  const { account: from, provider } = useMetaMask()
  const [getTokensLoadig, setGetTokensLoading] = useState<boolean>(false)

  const [deposit, setDeposit] = useState<string>('')
  const [inputs, setInputs] = useState(
    methods?.reduce((a, v) => ({...a, [v.name]: {params: [], value: ''} }), {})
  )

  const handleClick = async (method: string) => {
    const res = await contract?.methods[method](...(inputs[method]?.params || [])).call()

    setInputs({
      ...inputs,
      [method]: {
        ...inputs[method],
        value: JSON.stringify(res),
        params: []
      }
    })
  }

  const getTokens = async () => {
    console.log(from, provider);
    setGetTokensLoading(true)
    try {
      await contract?.methods.getTokens(Number(deposit)).send({ from })
    } catch (error) {
      setGetTokensLoading(false)
    }

    setGetTokensLoading(false)
  }

  const parseAnswer = (res: any) => {
    let parsedRes;
    try {
      parsedRes = Object.values(JSON.parse(res)).join(", ")
    } catch (error) {
      parsedRes = res
    }

    return parsedRes
  }

  if(!connected || !address) {
    return (
      <Styled.ContractWrapper empty>
        <h2>Please connect to Web3 and choise contract</h2>
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
      <h3>Contract: { address } </h3>
      <Styled.Methods>
        {
          methods?.map((m: any, index: number) => (
            <Styled.Method key={index}>
              <Styled.MethodName>{m.name}</Styled.MethodName>
              <Styled.MethodBody>
                {m.params && (
                  <>
                    {m.params.map((param: InpOut, index: number) => (
                    <Styled.InputGroup key={index}>
                      {param.name}
                      <Styled.MethodInput
                        placeholder={param.typeName}

                        onChange={(e) => {
                          setInputs({
                            ...inputs,
                            [m.name]: {
                              ...inputs[m.name],
                              params: [
                                ...(inputs[m.name]?.params || []).slice(0, index),
                                e.target.value, 
                                ...(inputs[m.name]?.params || []).slice(index + 1)
                              ]
                            }
                          })
                        }}
                      />
                    </Styled.InputGroup>
                    ))}
                    <Styled.MethodButton onClick={() => handleClick(m.name)}>
                      Call
                    </Styled.MethodButton>
                    <p>Result: {parseAnswer(inputs[m.name]?.value)}</p>
                  </>
                )}
                {m.value}
                </Styled.MethodBody>
            </Styled.Method>
          ))
        }

      <Styled.MethodGet>
        <Styled.MethodInput placeholder='Deposit' onChange={(e) => setDeposit(e.target.value)} />
        <Styled.LoadingGroup>
          <Styled.MethodButton onClick={getTokens}>
            Get Tokens
          </Styled.MethodButton>
          {getTokensLoadig && (
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