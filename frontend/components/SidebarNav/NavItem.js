import { withRouter } from 'next/router'
import Link from 'next/link'

import styled from 'styled-components'

const StyledNavItem = styled.div`
  .navText {
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    font-size: 0.75rem;
  }

  .navItem {
    height: 48px;
    padding: 0rem 2rem;
    display: flex;
    align-items: center;
  }

  .active {
    border-right: 3px solid #fff;
    background: #434c5e;
  }
`

const NavItem = ({ linkText, path, router }) => {
  let navItemClass = 'navItem'
  if (router.pathname === path) {
    navItemClass = `${navItemClass} active`
  }
  return (
    <StyledNavItem>
      <Link href={path}>
        <a className="navText">
          <div className={navItemClass}>{linkText}</div>
        </a>
      </Link>
    </StyledNavItem>
  )
}

export default withRouter(NavItem)
