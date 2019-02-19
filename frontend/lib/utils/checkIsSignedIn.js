import { ME_QUERY } from '../graphql/queries'

const checkIsSignedIn = async client => {
  try {
    const { data = {} } = await client.query({
      query: ME_QUERY
    })
    return Boolean(data.me && data.me.id)
  } catch (e) {
    return false
  }
}

export default checkIsSignedIn
