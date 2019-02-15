import Link from 'next/link'

import Login from '../components/Login'

const Auth = props => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Login />
  </div>
)

Auth.unprotected = true

export default Auth
