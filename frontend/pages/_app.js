import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/client/withData'

import { checkIsSignedIn, redirect } from '../lib/utils'
import Page from '../components/Page'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { res, apolloClient } = ctx
    const isSignedIn = await checkIsSignedIn(apolloClient)
    // protected route && not signed in
    if (!Component.unprotected && !isSignedIn) {
      redirect({ res, path: '/auth' })
    }
    // unprotected route && signed in
    else if (Component.unprotected && isSignedIn) {
      redirect({ res, path: '/' })
    }
    if (Component.getInitialProps) {
      Component.getInitialProps(ctx)
    }
    return {}
  }

  render() {
    const { Component, pageProps, apollo } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
