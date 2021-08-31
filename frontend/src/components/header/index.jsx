import React from 'react'
import './style.css'

import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

const { Header } = Layout

const HeaderComponent = () => {
  return (
    <Header>
      <Link to="/">
        <div className="logo">
          <h1 className="logo-title">
            SportsX
          </h1>
        </div>
      </Link>
      <Link to="/create-client">
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Novo Cliente</Menu.Item>
        </Menu>
      </Link>
    </Header>
  )
}

export default HeaderComponent