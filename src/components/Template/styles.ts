import styled from "styled-components"

export const MainBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Logo = styled.img`
  width: 110px;
  height: 40px;
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
