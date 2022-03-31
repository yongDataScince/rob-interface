import React from "react";
import logo from 'src/images/logo.svg'
import * as Styled from './styles'
import { FaCopy } from "react-icons/fa";

interface Props {
  connected?: boolean
  userAddress?: string | null
  netName?: string
  connect?: () => void
  disconnect?: () => void
}

export const Template: React.FC<Props> = ({ children, connected, userAddress, netName, connect, disconnect }) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(userAddress || '')
  }

  return (
    <Styled.MainBox>
      <Styled.Header>
        <a href="https://cryptorobotics.co/">
          <Styled.Logo src={logo} />
        </a>
        { !connected ? 
          <Styled.MetaButton onClick={async () => connect && await connect()}>
            Connect to Web3
          </Styled.MetaButton> : (
            <Styled.Group>
              {netName !== 'main' && <Styled.NetWork>{netName}</Styled.NetWork>}
              <Styled.AddressLink onClick={copyAddress}>
                {userAddress} <FaCopy />
              </Styled.AddressLink>
              <Styled.MetaButton onClick={async () => disconnect && await disconnect()}>
                Disconnect
              </Styled.MetaButton>
            </Styled.Group>
          )
        }
      </Styled.Header>
      {children}
    </Styled.MainBox>
  )
}