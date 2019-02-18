import styled from 'styled-components'

const Button = styled.button`
  height: 48px;
  width: 150px;
  padding: 0.5rem;
  font-size: 0.75rem;
  border-radius: 12px;
  background-color: #7d45fc;
  color: #fff;
  font-weight: 300;
  outline: none;
  letter-spacing: 0.05rem;
  box-shadow: ${props => props.theme.bs};
`

export default Button
