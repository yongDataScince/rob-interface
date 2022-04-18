import React, { ChangeEvent, useState } from "react";
import * as Styled from "./styled";
import { IoIosArrowDown } from 'react-icons/io'

interface Props {
  values: string | string[]
  value: string
  disabled?: boolean
  className?: string
  itemClassName?: string
  isShortAddr?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onChoise?: (address: string | number) => void
  onKeyPress?: (address: string | number) => void
}

export const DropDown: React.FC<Props> = ({ values, value, isShortAddr, className, disabled, itemClassName, onChange, onChoise, onKeyPress }) => {
  const [opened, setOpened] = useState<boolean>(false)

  const times = (amount = 1) => new Array(amount).fill(null)

  const itemClick = (value: string | number) => {
    setOpened(!opened)
    onChoise && onChoise(value)
  }

  return (
    <Styled.Wrapper className={className} hasError={isShortAddr}>
      {onChange ? (
        <Styled.Input
          isShortAddr={isShortAddr}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder='0x000...'
          onKeyPress={(e) => e.key === 'Enter' && onKeyPress && onKeyPress(value)}
        />
      ) : (
        <Styled.NotInput>{value}</Styled.NotInput>
      )}

      {!disabled && 
        <>
          <Styled.Button onClick={() => setOpened(!opened)} open={opened}>
            {
              values.length > 1 && <IoIosArrowDown size={20} color='#1e2c6e' />
            }
          </Styled.Button>
        </>
      }
      <Styled.MenuWrapper open={opened}>
        {
          typeof values === 'string' ? (
            times(Number(values))
              .map((_item, index) => (
                <Styled.MenuItem
                  className={itemClassName}
                  key={index}
                  isNumber
                  onClick={() => itemClick(Number(index + 1))}>
                    {index + 1}
                </Styled.MenuItem>
              ))
          ) : (
            values.map(addr => <Styled.MenuItem className={itemClassName} key={addr} onClick={() => itemClick(addr)}>{addr}</Styled.MenuItem>)
          )
        }
      </Styled.MenuWrapper>
    </Styled.Wrapper>
  )
}