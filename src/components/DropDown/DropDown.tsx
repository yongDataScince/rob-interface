import React, { ChangeEvent, useState } from "react";
import * as Styled from "./styled";
import { IoIosArrowDown } from 'react-icons/io'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  values: string[]
  value: string
  disabled?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onChoise?: (address: string) => void
  className?: string
}

export const DropDown: React.FC<Props> = ({ values, value, className, disabled, onChange, onChoise }) => {
  const [opened, setOpened] = useState<boolean>(false)
  const itemClick = (value: string) => {
    setOpened(!opened)
    onChoise && onChoise(value)
  }

  return (
    <Styled.Wrapper className={className}>
      <Styled.Input disabled={disabled} value={value} onChange={onChange} placeholder='0x000...' />
      {!disabled && 
        <>
          <Styled.Button onClick={() => setOpened(!opened)} open={opened}>
            <IoIosArrowDown size={20} color='#1e2c6e' />
          </Styled.Button>
        </>
      }
      <Styled.MenuWrapper open={opened}>
        {
          values.map(addr => <Styled.MenuItem key={addr} onClick={() => itemClick(addr)}>{addr}</Styled.MenuItem>)
        }
      </Styled.MenuWrapper>
    </Styled.Wrapper>
  )
}