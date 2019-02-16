import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/client/withData'

import { checkIsSignedIn, redirect } from '../lib/utils'
import { ME_QUERY } from '../lib/graphql/queries'

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
      Component.getInitialProps()
    }
    return {}
  }

  render() {
    const { Component, pageProps, apollo } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
