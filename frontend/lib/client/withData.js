import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { backendEndpoint } from '../../config'

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? backendEndpoint : backendEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      })
    }
  })
}

export default withApollo(createClient)
