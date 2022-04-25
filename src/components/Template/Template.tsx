import React from "react";
import logo from 'src/images/logo.svg'
import * as Styled from './styles'
import { FaCopy } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  connected?: boolean
  userAddress?: string | null
  lang: string
  connect?: () => void
  disconnect?: () => void
}

export const Template: React.FC<Props> = ({ children, connected, userAddress, lang, connect, disconnect }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate();

  const copyAddress = () => {
    navigator.clipboard.writeText(userAddress || '')
  }

  const changeLang = () => {
    i18n.changeLanguage(lang === 'en' ? 'ru' : 'en')
    navigate(lang === 'en' ? '/ru' : '/en')
  }

  return (
    <Styled.MainBox>
      <Styled.Header>
        <Styled.MetaButton onClick={changeLang}>
          {lang === 'en' ? 'ru' : 'en'}
        </Styled.MetaButton>
        <a href="https://cryptorobotics.co/">
          <Styled.Logo src={logo} />
        </a>
        { !connected ? 
          <Styled.MetaButton onClick={async () => connect && await connect()}>
            {t('connect')}
          </Styled.MetaButton> : (
            <Styled.Group>
              <Styled.AddressLink onClick={copyAddress}>
                {userAddress} <FaCopy />
              </Styled.AddressLink>
              <Styled.MetaButton onClick={async () => disconnect && await disconnect()}>
                {t('disconnect')}
              </Styled.MetaButton>
            </Styled.Group>
          )
        }
      </Styled.Header>
      {children}
    </Styled.MainBox>
  )
}