import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styled/GlobalStyles'
import Router from 'next/router'
import NProgress from 'nprogress'
// import Header from './Header'
import Meta from '../Meta'

const theme = {
  background: '#EEEEEE',
  purple: '#7d45fc',
  darkBlue: '#293244',
  text: 'rgba(0,0,0, 0.87)',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
}

const StyledPage = styled.div`
  color: ${props => props.theme.black};
  height: 100%;
  > div {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .appContainer {
    display: flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
  }
`

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <StyledPage>
            <Meta />
            <div>{this.props.children}</div>
          </StyledPage>
          <GlobalStyle />
        </>
      </ThemeProvider>
    )
  }
}

export default Page
