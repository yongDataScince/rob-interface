import styled from "styled-components"

export const MainBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const NetWork = styled.div`
  padding: 3px 8px;
  background: #fff;
  color: #1e2c6e;
  border-radius: 10px;
`

export const Logo = styled.img`
  width: 130px;
  height: 60px;
`

export const Header = styled.header`
  width: 100%;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const MetaButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  background: inherit;
  color: #fff;
  border: 2px solid #fff;
  transition: .1s;
  &:active {
    color: #1e2c6e;
    background: #FFFFFF;
  }
`

export const Group = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 15px;
  }
`

export const AddressLink = styled.button`
  background: none;
  color: #fff;
  transition: color .2s;

  &:hover {
    color: #d0d7ff;
  }

  &:active {
    color: #8fa1ff;
  }
`
