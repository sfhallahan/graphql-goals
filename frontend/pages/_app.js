import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/client/withData'

import { checkIsSignedIn, redirect } from '../lib/utils'
import Page from '../components/Page'
import SidebarNav from '../components/SidebarNav'
import Header from '../components/Header'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { res, apolloClient } = ctx
    const isAuthed = await checkIsSignedIn(apolloClient)
    // protected route && not signed in
    if (!Component.unprotected && !isAuthed) {
      redirect({ res, path: '/auth' })
    }
    // unprotected route && signed in
    else if (Component.unprotected && isAuthed) {
      redirect({ res, path: '/' })
    }
    if (Component.getInitialProps) {
      Component.getInitialProps(ctx)
    }
    return { isAuthed }
  }

  render() {
    const { Component, pageProps, apollo, isAuthed } = this.props
    console.log(isAuthed)
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <SidebarNav isAuthed={isAuthed} />
            <div className="appContainer">
              <Header isAuthed={isAuthed} />
              <Component {...pageProps} />
            </div>
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
