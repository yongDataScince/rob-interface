import styled, { keyframes } from "styled-components";
import DropDown from "../DropDown";

interface Props {
  empty?: boolean
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const ContractWrapper = styled.div<Props>`
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  width: 50vw;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 4px rgba(50,50,50,0.33);
  color: #1e2c6e;
  text-align: center;
  overflow-y: auto;
  justify-content: ${({ empty }) => empty ? 'center': 'flex-start'};

  h4 {
    margin-top: 20px;
    text-align: left;
  }
`

export const Methods = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
`

export const Method = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #1e2b6e20;
  overflow: visible;
  width: 100%;
  margin-bottom: 5px;
`

export const MethodName = styled.div`
  background: #1e2b6e20;
  text-align: left;
  padding: 5px;
`
export const MethodBody = styled.div`
  background: #FFFF;
  text-align: left;
  padding: 5px;

`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3px;
  font-size: 14px;
  margin-bottom: 5px;
`

export const MethodInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 4px;
`

export const MethodButton = styled.button`
  padding: 10px;
  background: #1e2c6e;
  color: #FFFFFF;
  border-radius: 5px;
  max-width: 100px;
  &:active {
    background: #01274f;
  }
`

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoadingItem = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  border: 3px solid #1e2c6e;
  animation: ${rotate} 2s infinite forwards;
`

export const LoadingTransactionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoadingItemLittle = styled(LoadingItem)`
  width: 20px;
  height: 20px;
`

export const DropGroup = styled.div`
  display: flex;
  align-items: center;
`

export const LoadingGroup = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 25px;
  }
`

export const CustomDrop = styled(DropDown)`
  max-width: 100px;
  padding: 0;
  margin: 0;
  .number-item {
    height: 27px;
  }
  button {
    right: 2px;
  }
`

export const MethodGet = styled(Method)`
  border: none;
`

export const Message = styled.p`
  font-size: 14px;
`