import gql from 'graphql-tag'

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      email
    }
  }
`
export { ME_QUERY }
