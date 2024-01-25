import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="fixed z-[1100] flex h-24 w-full justify-between border-[2px] border-b-card bg-background">
      <Link className="flex items-center pl-24" href="/">
        HOME
      </Link>
      <div className="flex items-center  pr-24">{/* <ModeToggle /> */}</div>
    </header>
  )
}
export default Header
