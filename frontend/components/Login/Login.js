import React from 'react'
import BookLoverSVG from '../../svg/book_lover.svg'
import MailIconSVG from '../../svg/icon-mail.svg'
import LockClosedSVG from '../../svg/icon-lock-closed.svg'
import styled from 'styled-components'

import Button from '../styled/Button'

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #eee;

  .loginContainer {
    flex: 1 1 auto;
    max-width: 1000px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 0 48px;
  }

  form {
    flex: 1 1 450px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  label {
    color: rgba(0, 0, 0, 0.67);
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    opacity: 0.6;
  }
  .imageContainer {
    flex: 0 0 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 3rem;
    > * {
      width: 450px;
    }
  }

  .inputGroup {
    width: calc(100% - 1rem);
    flex: 1 0 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 0.5rem;
    > * {
      margin: 0 0.5rem 0.25rem 0;
    }
  }

  input {
    flex: 1 0 auto;
    line-height: 1.5rem;
    font-size: 1rem;
    background-color: #fff;
    border: none;
  }

  h4 {
    font-size: 1rem;
    margin: 0 0 0.5rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0 0 1.5rem;
  }
  .buttonGroup {
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-start;
  }

  .inputGroup > svg {
    fill: rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 920px) {
    .imageContainer {
      display: none;
    }
    form {
      justify-content: center;
    }
`

const CreateAccountButton = styled(Button)`
  background: #fff;
  color: ${props => props.theme.text};
  margin-left: 1rem;
`

const Login = ({ onSubmit, onInputChange, email, password, loading }) => (
  <StyledLogin>
    <div className="loginContainer">
      <div className="imageContainer">
        <BookLoverSVG />
      </div>
      <form method="post" onSubmit={onSubmit}>
        <h4>{'Welcome Back :)'}</h4>
        <h2>{'Login to your account'}</h2>
        <div className="formGroup">
          <label htmlFor="email">EMAIL ADDRESS</label>
          <div className="inputGroup">
            <MailIconSVG />
            <input id="email" type="email" name="email" value={email} onChange={onInputChange} />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="password">PASSWORD</label>
          <div className="inputGroup">
            <LockClosedSVG />
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="buttonGroup">
          <Button type="submit">Login</Button>
          <CreateAccountButton>Create Account</CreateAccountButton>
        </div>
      </form>
    </div>
  </StyledLogin>
)

export default Login
