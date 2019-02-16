import Router from 'next/router'

const redirect = ({ res, path }) => {
  if (typeof window === 'undefined') {
    res.writeHead(302, {
      Location: `http://localhost:3000${path}`
    })
    res.end()
    return
  }
  Router.push(`${path}`)
}

export default redirect
