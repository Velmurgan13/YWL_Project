import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as CgMenuRightAlt from 'react-icons/cg'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import yosemiteLogo from '../assets/images/BannerImages/logo.webp'
import { IconContext } from 'react-icons/lib'
import '../../Yosemitewestgate/Header/SidebarStyle.css'
import './Sidebar.css'

const Nav = styled.div`
  height: 80px;
  display: flex;
  justify-content: end;
  align-items: center;
  top: 8px;
  position: absolute;
  z-index: 9;
  transition: 0.5s;
  right: 20px;
`

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: end;
  align-items: center;
  transition: 0.5s;
`

const SidebarNav = styled.nav`
  background: #15171c;
  width: 290px;
  height: auto;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 0.5s;
  z-index: 10;
`

const SidebarWrap = styled.div`
  width: 100%;
  transition: 0.5s;
`

const Sidebar = () => {
  const [closeIcon, setcloseIcon] = useState('true')
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  const CloseSideNavLink = value => {
    setSidebar(value)
  }

  return (
    <>
      <div className='main-sidebar'>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar px-5'>
            <div className='web-logo'>
              <Link className='web-logo' to='/'>
                <img
                  src={yosemiteLogo}
                  title="Denny's"
                  alt="Denny's"
                  className=''
                />
              </Link>
            </div>
            <div className='ml-auto link-color'>
              <Link to='/' className='sidebar-tag nav-fs-21'>
                Home
              </Link>
              <Link to='/overview' className='sidebar-tag nav-fs-21'>
                Overview
              </Link>
              <Link to='/guestrooms' className=' sidebar-tag nav-fs-21 '>
                Rooms
              </Link>
              <Link to='/special' className=' sidebar-tag nav-fs-21 '>
                Specials
              </Link>
              <Link to='/contact' className='sidebar-tag nav-fs-21'>
                Contact Us
              </Link>
              <Link to='/reservations' className='sidebar-tag nav-fs-21'>
                Reservation
              </Link>
            </div>
          </div>
          <Nav className='faBar-icon'>
            <NavIcon to='#'>
              <CgMenuRightAlt.CgMenuRightAlt  onClick={showSidebar} />
            </NavIcon>
          </Nav>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              <NavIcon to='#' className='close-btn'>
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon>
              {SidebarData.map((item, index) => {
                return (
                  <SubMenu
                    item={item}
                    key={index}
                    handlerCloseIcon={CloseSideNavLink}
                  />
                )
              })}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      </div>
    </>
  )
}

export default Sidebar
