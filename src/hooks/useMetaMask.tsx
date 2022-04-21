/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

export interface ContextType { 
  isActive: boolean
  account: string | null | undefined
  isLoading: boolean
  mustChangeChain: boolean
  provider: any
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

export const SUPPORT_CHAINS = [56];

export const MataMaskContext = React.createContext<ContextType | null>(null)

export const injected = new InjectedConnector({ supportedChainIds: SUPPORT_CHAINS })

export const MetaMaskProvider: React.FC = ({ children }) => {
  const { activate, account, library, connector, active, deactivate } = useWeb3React()

  const [isActive, setIsActive] = useState(false)
  const [mustChangeChain, setMustChangeChain] = useState(false)

  const [shouldDisable, setShouldDisable] = useState(false) // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(true)
  const [provider, setProvider] = useState<string>()

  // Check when App is Connected or Disconnected to MetaMask
  const handleIsActive = useCallback(() => {
      setIsActive(active)
  }, [active])

  useEffect(() => {
      handleIsActive()
  }, [handleIsActive])

  // Connect to MetaMask wallet
  const connect = async () => {
      const chainId = Number(await injected.getChainId())
      if (!SUPPORT_CHAINS.includes(chainId)) {
          setMustChangeChain(true)
          return
      }
      
      setShouldDisable(true)
      setMustChangeChain(false)
      try {
          await activate(injected).then((val) => {
              setShouldDisable(false)
          })
      } catch(error) {
          console.log('Error on connecting: ', error)
      }
  }

  // Disconnect from Metamask wallet
  const disconnect = async () => {
      try {
          await deactivate()
      } catch(error) {
          console.log('Error on disconnnect: ', error)
      }
  }

  const values = useMemo(
      () => ({
          isActive,
          account,
          isLoading,
          connect,
          disconnect,
          shouldDisable,
          provider,
          mustChangeChain
      }),
      [isActive, isLoading, shouldDisable, account, provider, mustChangeChain]
  )

  return <MataMaskContext.Provider value={values}>{children}</MataMaskContext.Provider>
}

export const useMetaMask = () => {
  const context = useContext(MataMaskContext)

  if(!context) {
    throw new Error('useMetaMask hook: Not have context')
  }

  return context
}