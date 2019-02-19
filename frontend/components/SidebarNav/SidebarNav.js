import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'

import NavItem from './NavItem'

const StyledSidebar = styled.div`
  width: 200px;
  background: ${props => props.theme.darkBlue};
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
`

class SidebarNav extends Component {
  render() {
    console.log(this.props)
    const { isAuthed } = this.props
    if (!isAuthed) return null
    return (
      <StyledSidebar>
        <NavItem linkText="HOME" path="/" />
        <NavItem linkText="GOALS" path="/goals" />
      </StyledSidebar>
    )
  }
}

SidebarNav.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

export default SidebarNav
