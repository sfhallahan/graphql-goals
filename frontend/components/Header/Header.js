import React, { Component } from 'react'
import styled from 'styled-components'

import SignoutButton from '../SignoutButton'

const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  max-height: 48px;
  background: 'red';
  flex: 1;
  padding: 0 36px;
`

class Header extends Component {
  render() {
    const { isAuthed } = this.props
    if (!isAuthed) return null
    return (
      <StyledHeader>
        <SignoutButton>LOGOUT</SignoutButton>
      </StyledHeader>
    )
  }
}

export default Header
