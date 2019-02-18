import Link from 'next/link'

import Login from '../components/Login'

const Auth = props => (
  <div>
    <Login />
  </div>
)

Auth.unprotected = true

export default Auth
