import styled, { css } from 'styled-components'

interface Props {
  open?: boolean
}

export const Wrapper = styled.div`
  position: relative;
  padding: 7px;
  border-radius: 10px;
  background: #FFFFFF;
  width: 50vw;
  margin-top: 50px;
`

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 2px;
  border: 2px solid #1e2c6e;
  color: #1e2c6e;
  font-size: 18px;
  &::placeholder {
    color: #2d3f9983;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const Button = styled.button<Props>`
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 50%;
  background: transparent;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
  ${({ open }) => css`transform: translate(-50%, -50%) rotate(${open ? '180deg' : '0'})`}
`

export const MenuWrapper = styled.div<Props>`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 5px;
  bottom: 0;
  left: 0;
  z-index: 11;
  transition: .2s;
  margin-top: 5px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  ${({ open }) => css`
    transform: ${open ? 'translateY(calc(100% + 2px))' : 'translateY(92%)'};
    opacity: ${Number(open)};
    visibility: ${open ? 'visible' : 'hidden'};
  `}
`

export const MenuItem = styled.div`
  width: 100%;
  padding: 5px;
  font-size: 14px;
  transition: .2s;
  color: #1e2c6e;
  border-bottom: 1px solid #2d3f9983;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #2d3f9917;
  }
`
