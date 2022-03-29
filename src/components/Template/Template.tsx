import React from "react";
import logo from 'src/images/logo.svg'
import * as Styled from './styles'

interface Props {
  connected?: boolean
  userAddress?: string | null
  connect?: () => void
  disconnect?: () => void
}

export const Template: React.FC<Props> = ({ children, connected, userAddress, connect, disconnect }) => (
  <Styled.MainBox>
    <Styled.Header>
      <Styled.Logo src={logo} />
      { !connected ? 
        <Styled.MetaButton onClick={async () => connect && await connect()}>
          Подключиться к Web3
        </Styled.MetaButton> : (
          <Styled.Group>
            {userAddress}
            <Styled.MetaButton onClick={async () => disconnect && await disconnect()}>
              Отключиться
            </Styled.MetaButton>
          </Styled.Group>
        )
      }
    </Styled.Header>
    {children}
  </Styled.MainBox>
)